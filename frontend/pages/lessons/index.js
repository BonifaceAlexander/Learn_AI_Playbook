import fs from 'fs'
import path from 'path'
import Link from 'next/link'

export async function getStaticProps() {
  const idxPath = path.join(process.cwd(), 'content', 'lessons', 'index.json')
  console.log('DEBUG: process.cwd() =', process.cwd());
  console.log('DEBUG: idxPath =', idxPath);
  console.log('DEBUG: exists =', fs.existsSync(idxPath));

  const data = fs.existsSync(idxPath) ? JSON.parse(fs.readFileSync(idxPath, 'utf8')) : []
  return { props: { lessons: data } }
}

export default function LessonsIndex({ lessons }) {
  if (!lessons || lessons.length === 0) {
    return (
      <div className="container">
        <h1>Lessons — Learn AI Playbook</h1>
        <p>No lessons found.</p>
        <div style={{ marginTop: 20 }}><Link href="/">← Home</Link></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '40px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'var(--text-secondary)' }}>
          ← Back to Launchpad
        </Link>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>
          AI <span className="hero-gradient">Lessons</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
          Practical, hands-on guides to master GenAI concepts.
        </p>
      </div>

      <div className="grid-3">
        {lessons.map(l => (
          <Link href={'/lessons/' + l.slug} key={l.slug} className="card" style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>
              {/* Simple logic to assign random-ish icons based on title length */}
              {l.title.includes('LLM') ? '🤖' :
                l.title.includes('Prompt') ? '✍️' :
                  l.title.includes('RAG') ? '🔍' :
                    l.title.includes('Agent') ? '🕵️' : '📚'}
            </div>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>{l.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {l.description}
            </p>
            <div style={{ marginTop: '16px', color: 'var(--accent-primary)', fontWeight: 500, fontSize: '0.9rem' }}>
              Start Lesson →
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
