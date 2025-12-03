# Intro to Large Language Models (LLMs)

**What you'll learn**
- What an LLM is
- Tokens, context window, and model capacity
- Use cases, strengths and limitations

---

## Short summary

LLMs are deep learning models trained on large corpora to model and generate natural language. This lesson explains training vs inference, tokens, and core limitations.

---

## Key concepts

- **Tokens** — Discrete units of text the model processes; tokenization affects cost and length.
- **Context window** — How many tokens the model can attend to at once; affects how much history it can use.
- **Training vs inference** — Training learns weights; inference uses weights to autoregressively generate tokens.

---

## Quick runnable example

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained('gpt2')
text = 'Large Language Models are powerful tools.'
ids = tokenizer.encode(text)
print('Token count:', len(ids))
```

## Exercise

- Create a template that returns JSON with fields 'summary' and 'tags'.
- Test with varied inputs and measure consistency.

![Prompt Flow](/diagrams/prompt-flow.png)

[Try it in Sandbox](/sandbox?prompt=Create%20a%20template%20that%20returns%20JSON%20with%20fields%20summary%20and%20tags.)

![LLM Architecture](/diagrams/llm-architecture.png)

[Try it in Sandbox](/sandbox?prompt=Run%20the%20example%20and%20measure%20token%20counts%20for%20short%20vs%20long%20prompts.)

---

## Further reading

- Vaswani et al., 'Attention Is All You Need'
- Hugging Face documentation on Transformers
- OpenAI best practices
