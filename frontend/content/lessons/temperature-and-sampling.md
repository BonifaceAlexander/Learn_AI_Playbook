# Temperature & Sampling

**What you'll learn**
- Temperature & randomness
- Top-p and Top-k
- When to use deterministic vs creative settings

---

## Short summary

Temperature controls randomness in token sampling. Lower temperature produces conservative outputs; higher temperature increases creativity.

---

## Key concepts

- **Temperature** — 0.0 = deterministic, 1.0 = more random.
- **Top-p** — Nucleus sampling selects from top probability mass.
- **Top-k** — Limits sampling to top-k tokens.

---

## Exercise

- Compare same prompt at temp 0.0, 0.7, and 1.0.
- Try top-p with different values.

![Sampling Diagram](/diagrams/sampling-diagram.png)

[Try it in Sandbox](/sandbox?prompt=Compare%20same%20prompt%20at%20temp%200.0%2C%200.7%2C%20and%201.0.)

---

## Further reading

- Sampling methods overview (Blog posts)
