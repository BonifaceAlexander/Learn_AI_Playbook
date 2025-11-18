# Embeddings & Vector DBs

**What you'll learn**
- What embeddings are
- Similarity metrics
- Popular vector DBs

---

## Short summary

Embeddings convert text into vectors for similarity search. Vector DBs store and search these efficiently.

---

## Key concepts

- **Embedding models** — Small models like MiniLM for fast embeddings.
- **Distance metrics** — Cosine similarity common for semantic search.
- **DB choices** — Chroma, Weaviate, Pinecone, Milvus

---

## Quick runnable example

```python
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('all-MiniLM-L6-v2')
print(model.encode(['hello']).shape)
```

## Exercise

- Index 10 short docs and query similar topics.
- Experiment with cosine vs euclidean distance.

---

## Further reading

- SentenceTransformers docs
- Pinecone quickstart
