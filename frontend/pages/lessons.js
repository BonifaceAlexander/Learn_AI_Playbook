import Link from 'next/link'
export default function Lessons(){
  return (
    <div className="container">
      <h1>Lessons</h1>
      <p>Short lessons to get you started.</p>
      <ul>
        <li><strong>Intro to LLMs</strong> — tokens, temperature, system vs user prompts.</li>
        <li><strong>Prompt Engineering</strong> — templates, few-shot, instructions.</li>
        <li><strong>RAG Basics</strong> — indexing, retrieval, and grounding.</li>
      </ul>
      <p><Link href="/sandbox"><a>Try examples in Sandbox →</a></Link></p>
    </div>
  )
}
