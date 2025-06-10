import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY || 'dummy-key');

const SYSTEM_PROMPT = `You are AuraMind, an advanced AI voice assistant. Your responses should be:
- Concise and direct
- Helpful and practical
- Natural and conversational
- Focused on the user's immediate needs

You can help with:
- Task management and scheduling
- Information requests
- General assistance
- Feature explanations about AuraMind

Keep responses under 100 words unless more detail is specifically requested.`;

export async function generateResponse(prompt: string): Promise<string> {
  try {
    // In development, return mock responses if no API key is present
    if (!import.meta.env.VITE_GOOGLE_API_KEY) {
      return getMockResponse(prompt);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const contextualPrompt = `${SYSTEM_PROMPT}\n\nUser: ${prompt}`;
    
    const result = await model.generateContent(contextualPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return "I apologize, but I'm having trouble processing your request right now. Please try again.";
  }
}

function getMockResponse(prompt: string): string {
  const promptLower = prompt.toLowerCase();
  
  if (promptLower.includes('schedule') || promptLower.includes('calendar')) {
    return "I can help you manage your schedule. In demo mode, I'm showing you how I'd respond to calendar-related queries.";
  }
  
  if (promptLower.includes('reminder')) {
    return "I'll set a reminder for you. In demo mode, I'm showing you how I'd handle reminder requests.";
  }
  
  if (promptLower.includes('feature')) {
    return "I can help with task management, scheduling, message handling, and proactive assistance. Check out the features section above for more details.";
  }
  
  return "I understand your request. In demo mode, I'm showing you how I'd respond to various queries. In production, I'll use Gemini AI to provide more specific assistance.";
}