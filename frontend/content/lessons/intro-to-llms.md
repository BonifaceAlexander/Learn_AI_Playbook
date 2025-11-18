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

- Run the example and measure token counts for short vs long prompts.
- Try a few-shot prompt and observe token growth.

---

## Further reading

- Vaswani et al., 'Attention Is All You Need'
- Hugging Face documentation on Transformers
- OpenAI best practices
