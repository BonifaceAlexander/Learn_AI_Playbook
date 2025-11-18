# Building Agents

**What you'll learn**
- Agent architectures
- Tool calling patterns
- Safety & orchestration

---

## Short summary

Agents combine LLMs with tools (APIs, knowledge bases) to perform multi-step tasks. Design carefully to avoid unsafe behavior.

---

## Key concepts

- **Planner-Executor** — Planner proposes steps; executor runs tools.
- **Tool sandboxing** — Restrict tools to safe scopes.
- **Retries & verification** — Validate outputs before actions.

---

## Exercise

- Design an agent that reads a calendar and suggests meeting times.
- Sketch failure modes and mitigations.

---

## Further reading

- LangChain agent docs
- Tool-using agent research
