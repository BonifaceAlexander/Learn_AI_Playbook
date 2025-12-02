import Head from 'next/head';
import Link from 'next/link';

export default function Gallery() {
    const projects = [
        {
            id: 1,
            title: "Customer Support Bot 3000",
            author: "Sarah J.",
            description: "A RAG-based bot that answers questions about a fictional coffee shop menu. Uses vector search for accurate pricing.",
            tags: ["RAG", "Chatbot", "Retail"],
            likes: 124
        },
        {
            id: 2,
            title: "Haiku Generator",
            author: "Mike Chen",
            description: "Fine-tuned model that only speaks in 5-7-5 syllables. Great for poetic error messages.",
            tags: ["Fine-tuning", "Creative", "Poetry"],
            likes: 89
        },
        {
            id: 3,
            title: "SQL Query Builder",
            author: "DevOps Dave",
            description: "Translates natural language questions into complex PostgreSQL queries. Includes safety guardrails against injection.",
            tags: ["Tool Use", "SQL", "Productivity"],
            likes: 256
        },
        {
            id: 4,
            title: "Recipe Remixer",
            author: "FoodieAI",
            description: "Takes any two recipes and merges them into a new fusion dish. Warning: Results may be delicious or disastrous.",
            tags: ["Prompt Engineering", "Fun", "Food"],
            likes: 67
        },
        {
            id: 5,
            title: "Legal Document Summarizer",
            author: "LawTech Inc",
            description: "Summarizes 50-page contracts into 3 bullet points. Uses chain-of-thought prompting for accuracy.",
            tags: ["Summarization", "Business", "CoT"],
            likes: 198
        }
    ];

    return (
        <div className="container">
            <Head>
                <title>Learn AI Playbook | Community Gallery</title>
            </Head>

            <div style={{ marginBottom: '40px' }}>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'var(--text-secondary)' }}>
                    ← Back to Launchpad
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>
                            Community <span className="hero-gradient">Gallery</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                            Discover what others are building with GenAI.
                        </p>
                    </div>
                    <button className="btn btn-primary">
                        Submit Your Project 🚀
                    </button>
                </div>
            </div>

            <div className="grid-3">
                {projects.map(p => (
                    <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{p.title}</h3>
                            <span style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', background: 'rgba(50, 116, 217, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                                ❤️ {p.likes}
                            </span>
                        </div>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px', flex: 1 }}>
                            {p.description}
                        </p>

                        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {p.tags.map(tag => (
                                <span key={tag} style={{ fontSize: '0.75rem', border: '1px solid var(--border-color)', padding: '2px 8px', borderRadius: '12px', color: 'var(--text-secondary)' }}>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: 'auto' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                by <span style={{ color: 'var(--text-primary)' }}>{p.author}</span>
                            </span>
                            <button className="btn" style={{ padding: '6px 12px', fontSize: '0.85rem', background: 'var(--bg-secondary)' }}>
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
