# Tokens & Tokenization

**What you'll learn**
- What tokens are
- How tokenization affects cost
- Counting tokens

---

## Short summary

Tokens are the atomic units used by LLMs. Understanding tokenization helps you optimize prompts and estimate costs.

---

## Key concepts

- **Subword tokenization** — Models often use byte-pair encoding or unigram tokenizers resulting in subword tokens.
- **Token cost** — API providers charge per token; shorter prompts save cost.
- **Tokenizers vary** — Different models have different tokenizers (gpt2, tiktoken, sentencepiece).

---

## Quick runnable example

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained('gpt2')
print(len(tokenizer.encode('Hello world')))
```

## Exercise

- Compare token counts across tokenizers (gpt2 vs sentencepiece).
- Rewrite prompts to reduce tokens while preserving meaning.

---

## Further reading

- Hugging Face Tokenizers
- OpenAI tiktoken docs
