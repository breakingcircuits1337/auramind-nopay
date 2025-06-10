import { generateResponse } from './gemini';

class VoiceAssistant {
  private recognition: SpeechRecognition | null = null;
  private synthesis: SpeechSynthesis | null = null;
  private isListening: boolean = false;
  private voices: SpeechSynthesisVoice[] = [];
  private preferredVoice: SpeechSynthesisVoice | null = null;
  private wakeWord: string = 'hey aura';
  private isWakeWordEnabled: boolean = true;
  private isWaitingForCommand: boolean = false;
  private isSpeaking: boolean = false;
  private speakingStateListeners: ((isSpeaking: boolean) => void)[] = [];
  private volume: number = 1;
  private pitch: number = 1;
  private rate: number = 1;

  private wakeWordTimeoutId: number | null = null;
  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.setupRecognition();
      }

      if ('speechSynthesis' in window) {
        this.synthesis = window.speechSynthesis;
        this.loadVoices();
      }

      // Load saved settings from localStorage
      const savedWakeWord = localStorage.getItem('wakeWord');
      if (savedWakeWord) {
        this.wakeWord = savedWakeWord;
      }

      const wakeWordEnabled = localStorage.getItem('wakeWordEnabled');
      if (wakeWordEnabled !== null) {
        this.isWakeWordEnabled = wakeWordEnabled === 'true';
      }

      const savedVolume = localStorage.getItem('volume');
      if (savedVolume !== null) {
        this.volume = parseFloat(savedVolume);
      }

      const savedPitch = localStorage.getItem('pitch');
      if (savedPitch !== null) {
        this.pitch = parseFloat(savedPitch);
      }

      const savedRate = localStorage.getItem('rate');
      if (savedRate !== null) {
        this.rate = parseFloat(savedRate);
      }

      this.requestMicrophonePermission();
    }
  }

  public addSpeakingStateListener(listener: (isSpeaking: boolean) => void) {
    this.speakingStateListeners.push(listener);
  }

  public removeSpeakingStateListener(listener: (isSpeaking: boolean) => void) {
    this.speakingStateListeners = this.speakingStateListeners.filter(l => l !== listener);
  }

  private notifySpeakingStateChange(isSpeaking: boolean) {
    this.isSpeaking = isSpeaking;
    this.speakingStateListeners.forEach(listener => listener(isSpeaking));
  }

  private async requestMicrophonePermission() {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone permission granted');
    } catch (error) {
      console.error('Microphone permission denied:', error);
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript.toLowerCase();
      
      // Dispatch transcript update event
      window.dispatchEvent(new CustomEvent('transcript-update', { 
        detail: transcript 
      }));

      if (event.results[current].isFinal) {
        if (this.isWakeWordEnabled && !this.isWaitingForCommand) {
          // Check for wake word in final transcript
          if (transcript.includes(this.wakeWord)) {
            this.isWaitingForCommand = true;
            this.speak("I'm listening. How can I help?");
            // Set timeout to reset isWaitingForCommand if no command follows
            this.wakeWordTimeoutId = window.setTimeout(() => {
              this.isWaitingForCommand = false;
              console.log("Timeout. Listening for wake word again.");
              // Optional: Speak a timeout message
              // this.speak("Timeout. Listening for wake word again.");
            }, 5000); // 5 seconds timeout
            return;
          }
        } else if (this.isWaitingForCommand) {
          // If waiting for command, clear timeout and process the final transcript as a command
          if (this.wakeWordTimeoutId !== null) {
            window.clearTimeout(this.wakeWordTimeoutId);
            this.wakeWordTimeoutId = null;
          }
        } else {
          // Process command
          const response = await this.handleCommand(transcript);
          this.isWaitingForCommand = false;
          
          // Dispatch assistant response event
          window.dispatchEvent(new CustomEvent('assistant-response', { 
            detail: response 
          }));
        }
      }
    };

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      this.isListening = false;
    };

    this.recognition.onend = () => {
      if (this.isListening) {
        this.recognition?.start();
      }
    };
  }

  private loadVoices() {
    if (!this.synthesis) return;

    const loadVoices = () => {
      this.voices = this.synthesis?.getVoices() || [];
      this.preferredVoice = this.voices.find(voice => 
        voice.lang.startsWith('en') && voice.name.toLowerCase().includes('natural')
      ) || this.voices.find(voice => 
        voice.lang.startsWith('en')
      ) || null;
    };

    loadVoices();
    this.synthesis.onvoiceschanged = loadVoices;
  }

  private async handleCommand(command: string): Promise<string> {
    try {
      const response = await generateResponse(command);
      this.speak(response);
      return response;
    } catch (error) {
      console.error('Error processing command:', error);
      const errorMessage = "I'm sorry, I encountered an error processing your request.";
      this.speak(errorMessage);
      return errorMessage;
    }
  }

  public speak(text: string): void {
    if (!this.synthesis) return;

    this.synthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    if (this.preferredVoice) {
      utterance.voice = this.preferredVoice;
    }
    utterance.lang = 'en-US';
    utterance.pitch = this.pitch;
    utterance.rate = this.rate;
    utterance.volume = this.volume;

    utterance.onstart = () => this.notifySpeakingStateChange(true);
    utterance.onend = () => this.notifySpeakingStateChange(false);
    utterance.onerror = () => this.notifySpeakingStateChange(false);

    this.synthesis.speak(utterance);
  }

  public toggleListening(): boolean {
    if (!this.recognition) {
      this.speak("Speech recognition is not supported in your browser.");
      return false;
    }

    this.isListening = !this.isListening;

    if (this.isListening) {
      this.recognition.start();
      this.speak("Voice recognition activated. " + 
        (this.isWakeWordEnabled ? `Say "${this.wakeWord}" to start a command.` : "How can I help?"));
    } else {
      this.recognition.stop();
      this.speak("Voice recognition stopped.");
    }

    return this.isListening;
  }

  public setWakeWord(word: string): void {
    this.wakeWord = word.toLowerCase();
    localStorage.setItem('wakeWord', this.wakeWord);
  }

  public getWakeWord(): string {
    return this.wakeWord;
  }

  public toggleWakeWord(enabled: boolean): void {
    this.isWakeWordEnabled = enabled;
    localStorage.setItem('wakeWordEnabled', enabled.toString());
  }

  public isWakeWordActive(): boolean {
    return this.isWakeWordEnabled;
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    localStorage.setItem('volume', this.volume.toString());
  }

  public getVolume(): number {
    return this.volume;
  }

  public setPitch(pitch: number): void {
    this.pitch = Math.max(0.1, Math.min(2, pitch));
    localStorage.setItem('pitch', this.pitch.toString());
  }

  public getPitch(): number {
    return this.pitch;
  }

  public setRate(rate: number): void {
    this.rate = Math.max(0.1, Math.min(2, rate));
    localStorage.setItem('rate', this.rate.toString());
  }

  public getRate(): number {
    return this.rate;
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  public setPreferredVoice(voice: SpeechSynthesisVoice): void {
    this.preferredVoice = voice;
    localStorage.setItem('preferredVoice', voice.name);
  }

  public getPreferredVoice(): SpeechSynthesisVoice | null {
    return this.preferredVoice;
  }

  public isActive(): boolean {
    return this.isListening;
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const voiceAssistant = new VoiceAssistant();