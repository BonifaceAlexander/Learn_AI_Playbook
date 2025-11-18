import Link from 'next/link'
export default function Home() {
  return (
    <div className="container">
      <img src="/branding/logo.svg" alt="Learn AI Playbook" style={{height:80}} />
      <h1>Learn AI Playbook</h1>
      <p>An interactive GenAI playground — learn by doing with demos, lessons and a safe sandbox.</p>
      <div style={{marginTop:20}}>
        <Link href="/sandbox"><a>Try the Sandbox →</a></Link>
      </div>
      <div style={{marginTop:12}}>
        <Link href="/lessons"><a>Lessons →</a></Link> &nbsp; <Link href="/gallery"><a>Gallery →</a></Link>
      </div>
    </div>
  )
}
