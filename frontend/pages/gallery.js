import Link from 'next/link'
export default function Gallery(){
  return (
    <div className="container">
      <h1>Gallery</h1>
      <p>Community demos (mocked for MVP).</p>
      <ul>
        <li>Summarizer Demo — by Bon</li>
        <li>RAG Q&A Demo — by Community</li>
        <li>Agent: Task Assistant — by Alice</li>
      </ul>
      <p><Link href="/sandbox"><a>Open Sandbox →</a></Link></p>
    </div>
  )
}
