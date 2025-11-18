# Few-shot & Context

**What you'll learn**
- How examples affect outputs
- Trade-offs with context window
- Designing compact examples

---

## Short summary

Few-shot prompting means giving examples in the prompt. This helps models follow strict output formats but uses up context window tokens.

---

## Key concepts

- **Example quality** — High-quality, diverse examples help the model generalize.
- **Context budget** — Each example consumes tokens; balance count vs quality.
- **Ordering** — Place the most representative examples near the prompt.

---

## Exercise

- Design 3 compact examples for a transformation task (e.g., CSV→JSON).
- Measure output consistency as you remove examples.

---

## Further reading

- Brown et al., GPT-3 paper
- Practical prompting guides
