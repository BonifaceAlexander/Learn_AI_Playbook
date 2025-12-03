import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), 'content', 'lessons')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))
  const paths = files.map(f => ({ params: { slug: f.replace(/\.md$/, '') } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'content', 'lessons', params.slug + '.md')
  const source = fs.readFileSync(filePath, 'utf8')
  return { props: { content: source, slug: params.slug } }
}

import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function Lesson({ content, slug }) {
  const [completed, setCompleted] = useState(false);

  if (!content) {
    return <div className="container">Error: No content found for this lesson.</div>;
  }

  const handleComplete = () => {
    setCompleted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Custom renderer for code blocks to add "Copy" button
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      const codeText = String(children).replace(/\n$/, '')

      if (!inline && match) {
        return (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => navigator.clipboard.writeText(codeText)}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              Copy
            </button>
            <code className={className} {...props}>
              {children}
            </code>
          </div>
        )
      }
      return <code className={className} {...props}>{children}</code>
    }
  }

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link href="/lessons" style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          ← Back to Lessons
        </Link>
      </div>

      <article className="card prose" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </article>

      <div style={{ marginTop: '40px', textAlign: 'center', paddingBottom: '40px' }}>
        {!completed ? (
          <button
            onClick={handleComplete}
            className="btn btn-primary"
            style={{ fontSize: '1.2rem', padding: '16px 32px' }}
          >
            Mark Lesson Complete ✅
          </button>
        ) : (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <h3 style={{ color: '#32d966', marginBottom: '16px' }}>Lesson Completed! 🎉</h3>
            <Link href="/lessons" className="btn" style={{ background: 'var(--bg-secondary)' }}>
              Choose Next Lesson →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
