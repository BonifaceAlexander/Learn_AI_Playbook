# Prompt Engineering Basics

**What you'll learn**
- System vs user prompts
- Few-shot prompting
- Templates and instructions

---

## Short summary

Prompt engineering is designing prompts that reliably elicit the desired behavior from an LLM. This covers system messages, examples, and structure.

---

## Key concepts

- **System message** — Sets high-level behavior or constraints for the assistant.
- **Few-shot** — Provide examples to shape output format.
- **Templates** — Parameterize prompts for reuse.

---

## Quick runnable example

```python
prompt = '''You are a helpful assistant.\nRespond with JSON: {"summary":...,"keywords":...}\nText: '''
```

## Exercise

- Create a template that returns JSON with fields 'summary' and 'tags'.
- Test with varied inputs and measure consistency.

![Prompt Flow Diagram](/diagrams/prompt-flow.png)

[Try it in Sandbox](/sandbox?prompt=Create%20a%20template%20that%20returns%20JSON%20with%20fields%20summary%20and%20tags.)

---

## Further reading

- OpenAI prompt best practices
- Examples from community repos
