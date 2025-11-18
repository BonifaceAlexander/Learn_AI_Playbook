import fs from 'fs'
import path from 'path'
import Link from 'next/link'

export async function getStaticProps() {
  const idxPath = path.join(process.cwd(), 'content', 'lessons', 'index.json')
  const data = fs.existsSync(idxPath) ? JSON.parse(fs.readFileSync(idxPath, 'utf8')) : []
  return { props: { lessons: data } }
}

export default function LessonsIndex({ lessons }) {
  return (
    <div className="container">
      <h1>Lessons — Learn AI Playbook</h1>
      <p>Practical, hands-on lessons to teach AI & GenAI concepts.</p>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:18, marginTop:18}}>
        {lessons.map(l=>(
          <div key={l.slug} style={{padding:16, border:'1px solid #eee', borderRadius:8, background:'#fff'}}>
            <h3 style={{marginTop:0}}><Link href={'/lessons/'+l.slug}><a>{l.title}</a></Link></h3>
            <p style={{marginBottom:8}}>{l.description}</p>
            <Link href={'/lessons/'+l.slug}><a>Read lesson →</a></Link>
          </div>
        ))}
      </div>
      <div style={{marginTop:20}}><Link href="/"><a>← Home</a></Link></div>
    </div>
  )
}
