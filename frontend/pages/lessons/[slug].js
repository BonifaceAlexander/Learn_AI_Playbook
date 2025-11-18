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

export default function Lesson({ content, slug }) {
  return (
    <div className="container">
      <div style={{marginBottom:12}}><Link href="/lessons"><a>← Back to Lessons</a></Link></div>
      <article style={{background:'#fff', padding:20, borderRadius:8}}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>
    </div>
  )
}
