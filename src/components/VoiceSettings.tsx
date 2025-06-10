import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Volume2, Save, Sliders, VolumeX } from 'lucide-react';
import { voiceAssistant } from '../lib/voiceAssistant';

const VoiceSettings: React.FC = () => {
  const [wakeWord, setWakeWord] = useState(voiceAssistant.getWakeWord());
  const [isWakeWordEnabled, setIsWakeWordEnabled] = useState(voiceAssistant.isWakeWordActive());
  const [volume, setVolume] = useState(voiceAssistant.getVolume());
  const [pitch, setPitch] = useState(voiceAssistant.getPitch());
  const [rate, setRate] = useState(voiceAssistant.getRate());
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(voiceAssistant.getVoices());
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(voiceAssistant.getPreferredVoice());

  useEffect(() => {
    // Update voices when they become available
    const interval = setInterval(() => {
      const currentVoices = voiceAssistant.getVoices();
      if (currentVoices.length > 0) {
        setVoices(currentVoices);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleSaveWakeWord = () => {
    voiceAssistant.setWakeWord(wakeWord);
    voiceAssistant.speak(`Wake word updated to ${wakeWord}`);
  };

  const handleToggleWakeWord = () => {
    const newState = !isWakeWordEnabled;
    setIsWakeWordEnabled(newState);
    voiceAssistant.toggleWakeWord(newState);
    voiceAssistant.speak(newState ? 'Wake word enabled' : 'Wake word disabled');
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    voiceAssistant.setVolume(value);
  };

  const handlePitchChange = (value: number) => {
    setPitch(value);
    voiceAssistant.setPitch(value);
  };

  const handleRateChange = (value: number) => {
    setRate(value);
    voiceAssistant.setRate(value);
  };

  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVoice = voices.find(voice => voice.name === event.target.value);
    if (selectedVoice) {
      setSelectedVoice(selectedVoice);
      voiceAssistant.setPreferredVoice(selectedVoice);
      voiceAssistant.speak('This is how I will sound with the selected voice.');
    }
  };

  const testVoice = () => {
    voiceAssistant.speak('This is a test of the current voice settings.');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Voice Assistant Settings</h3>
        
        <div className="space-y-4">
          {/* Wake Word Settings */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Mic size={20} />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Wake Word</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Customize the phrase to activate the assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={wakeWord}
                onChange={(e) => setWakeWord(e.target.value)}
                className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
                placeholder="Enter wake word"
              />
              <button
                onClick={handleSaveWakeWord}
                className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Save size={16} />
              </button>
            </div>
          </div>

          {/* Wake Word Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Volume2 size={20} />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Enable Wake Word</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Toggle wake word activation
                </p>
              </div>
            </div>
            <button
              onClick={handleToggleWakeWord}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isWakeWordEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Voice Selection */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Volume2 size={20} />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Voice Selection</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose the assistant's voice
                </p>
              </div>
            </div>
            <select
              value={selectedVoice?.name}
              onChange={handleVoiceChange}
              className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
            >
              {voices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>

          {/* Volume Control */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              <p className="font-medium text-gray-900 dark:text-white">Volume</p>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Pitch Control */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Sliders size={20} />
              <p className="font-medium text-gray-900 dark:text-white">Pitch</p>
            </div>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => handlePitchChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Rate Control */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Sliders size={20} />
              <p className="font-medium text-gray-900 dark:text-white">Speaking Rate</p>
            </div>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => handleRateChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Test Voice Button */}
          <button
            onClick={testVoice}
            className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Test Voice Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceSettings;