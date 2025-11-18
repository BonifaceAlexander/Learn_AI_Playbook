export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: 40, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 8 }}>Learn AI Playbook</h1>
      <p style={{ marginTop: 0 }}>
        A hands-on playground for AI & GenAI. Explore lessons, run examples in the sandbox, and learn by doing.
      </p>
      <div style={{ marginTop: 24 }}>
        <a href="/lessons" style={{
          display: "inline-block",
          padding: "10px 16px",
          background: "#0b6ef6",
          color: "white",
          borderRadius: 8,
          textDecoration: "none"
        }}>
          Explore Lessons →
        </a>
      </div>

      <section style={{marginTop:36}}>
        <h3>Quick links</h3>
        <ul>
          <li><a href="/lessons">Lessons index</a></li>
          <li><a href="/lessons/intro-to-llms">Intro to LLMs</a></li>
        </ul>
      </section>

      <footer style={{ marginTop:48, color:"#666", fontSize:13 }}>
        <div>Built with  — Learn AI Playbook</div>
      </footer>
    </main>
  )
}
