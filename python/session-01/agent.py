from pydantic_ai import Agent

agent = Agent(
    "anthropic:claude-haiku-5-5",
    instructions="Answer briefly.",
)

result = agent.run_sync("Please book me a hairdresser appointment for Friday.")
print(result.output)
