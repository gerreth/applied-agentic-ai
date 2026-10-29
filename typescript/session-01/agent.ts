import { Agent } from "@mastra/core/agent";

const agent = new Agent({
  id: "agent",
  name: "Agent",
  instructions: "Answer briefly.",
  model: "anthropic/claude-haiku-5-5",
});

const result = await agent.generate(
  "Please book me a hairdresser appointment for Friday. If you can't, write me a poem instead."
);
console.log(result.text);
