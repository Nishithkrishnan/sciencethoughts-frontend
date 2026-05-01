import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow the frontend to tell the agent WHICH "personality" to use
export async function POST(req: Request) {
  const { prompt, agentType } = await req.json();

  // Define Agent Personalities
  const agentConfigs: any = {
    "researcher": {
      system: "You are a world-class Science Researcher. Break down complex topics into first principles. Use bullet points and scientific terminology, but explain it simply.",
    },
    "strategist": {
      system: "You are a Business AI Strategist. Your goal is to find ways to automate business workflows using AI agents. Be practical, ROI-focused, and technical.",
    },
    "simplifier": {
      system: "You are the 'Explain Like I'm Five' expert. Take any complex AI or Science concept and explain it using a simple analogy that a child could understand.",
    }
  };

  const config = agentConfigs[agentType] || agentConfigs["researcher"];

  // Use streamText so the user sees the answer typing in real-time (Prevents Vercel timeouts!)
  const result = await streamText({
    model: openai('gpt-4o'),
    system: config.system,
    prompt: prompt,
  });

  return result.toDataStreamResponse();
}