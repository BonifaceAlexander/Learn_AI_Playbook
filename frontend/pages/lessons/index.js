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

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Module 1: Basics */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
            Module 1: The Brain 🧠 <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>(AI Basics)</span>
          </h2>
          <div className="grid-3">
            {lessons.filter(l => ['intro-to-llms', 'tokens-and-tokenization', 'temperature-and-sampling'].includes(l.slug)).map(l => (
              <LessonCard key={l.slug} lesson={l} />
            ))}
          </div>
        </div>

        {/* Module 2: Prompt Engineering */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
            Module 2: The Whisperer 🗣️ <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>(Prompt Engineering)</span>
          </h2>
          <div className="grid-3">
            {lessons.filter(l => ['prompt-engineering-basics', 'few-shot-and-context', 'system-messages-and-role'].includes(l.slug)).map(l => (
              <LessonCard key={l.slug} lesson={l} />
            ))}
          </div>
        </div>

        {/* Module 3: RAG */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
            Module 3: The Librarian 📚 <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>(RAG & Data)</span>
          </h2>
          <div className="grid-3">
            {lessons.filter(l => ['rag-basics', 'embeddings-and-vector-db'].includes(l.slug)).map(l => (
              <LessonCard key={l.slug} lesson={l} />
            ))}
          </div>
        </div>

        {/* Module 4: Agents */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
            Module 4: The Agent 🕵️ <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>(Autonomous AI)</span>
          </h2>
          <div className="grid-3">
            {lessons.filter(l => ['building-agents', 'tool-use'].includes(l.slug)).map(l => (
              <LessonCard key={l.slug} lesson={l} />
            ))}
          </div>
        </div>

        {/* Other Lessons */}
        <div style={{ marginBottom: '48px', opacity: 0.8 }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-secondary)' }}>
            Electives & Extra Credit
          </h2>
          <div className="grid-3">
            {lessons.filter(l => !['intro-to-llms', 'tokens-and-tokenization', 'temperature-and-sampling', 'prompt-engineering-basics', 'few-shot-and-context', 'system-messages-and-role', 'rag-basics', 'embeddings-and-vector-db', 'building-agents', 'tool-use'].includes(l.slug)).map(l => (
              <LessonCard key={l.slug} lesson={l} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

function LessonCard({ lesson }) {
  return (
    <Link href={'/lessons/' + lesson.slug} className="card" style={{ display: 'block', textDecoration: 'none' }}>
      <div style={{ fontSize: '2rem', marginBottom: '16px' }}>
        {lesson.title.includes('LLM') ? '🤖' :
          lesson.title.includes('Prompt') ? '✍️' :
            lesson.title.includes('RAG') ? '🔍' :
              lesson.title.includes('Agent') ? '🕵️' : '📚'}
      </div>
      <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>{lesson.title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
        {lesson.description}
      </p>
      <div style={{ marginTop: '16px', color: 'var(--accent-primary)', fontWeight: 500, fontSize: '0.9rem' }}>
        Start Lesson →
      </div>
    </Link>
  );
}
