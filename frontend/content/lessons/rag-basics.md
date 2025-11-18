# RAG (Retrieval-Augmented Generation) Basics

**What you'll learn**
- Why RAG is used
- Embeddings + vector DB
- Simple RAG pipeline

---

## Short summary

RAG combines a retriever (vector DB) with a generator. You index documents with embeddings and retrieve relevant passages to include in prompts.

---

## Key concepts

- **Indexing** — Embed documents and store vectors.
- **Retrieval** — Find nearest neighbors for a query.
- **Augmentation** — Include retrieved snippets in model prompt.

---

## Quick runnable example

```python
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer('all-MiniLM-L6-v2')
docs = ['Doc A','Doc B']
embs = model.encode(docs)
print(embs.shape)
```

## Exercise

- Build a tiny RAG: index 5 docs, run 3 queries, compare answers with/without retrieval.

---

## Further reading

- RAG overview papers
- Vector DB docs (Chroma, Pinecone)
