# Building AI Agents

**What you'll learn**
- What makes an "Agent" different from a Chatbot
- The ReAct Loop (Reasoning + Acting)
- Tool use and function calling

---

## Short summary

An **AI Agent** is an LLM that can *do* things, not just *say* things. It uses "Tools" (like a calculator, web search, or API) to perform actions based on its reasoning.

---

## Key concepts

- **Thought** — The LLM "thinking" about what to do next.
- **Action** — The LLM deciding to call a specific tool.
- **Observation** — The output of that tool (e.g., search results).
- **Loop** — The cycle of Thought → Action → Observation → Thought... until the task is done.

---

## The Agent Loop

![Agent Loop Diagram](/diagrams/agent-diagram.png)

---

## Quick runnable example

```python
# Pseudo-code for a ReAct Agent
tools = {"calculator": calculate, "search": google_search}

def run_agent(goal):
    history = [goal]
    while True:
        thought = llm.think(history)
        if "FINAL ANSWER" in thought:
            return thought
        
        tool_name, args = parse_action(thought)
        result = tools[tool_name](args)
        history.append(f"Observation: {result}")
```

## Exercise

- Simulate an agent that needs to answer "What is 25 * 48 + 100?".
- Watch it "think" to use a calculator.

[Try it in Sandbox](/sandbox?prompt=Simulate%20an%20AI%20Agent.%20Goal%3A%20%27Calculate%2025%20*%2048%20%2B%20100%27.%20Tools%3A%20%5BCalculator%5D.%20Show%20Thought%2C%20Action%2C%20Observation.)

---

## Further reading

- ReAct: Synergizing Reasoning and Acting in Language Models
- LangChain / AutoGPT documentation
