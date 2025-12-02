import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Learn AI Playbook | Launchpad</title>
      </Head>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '80px 0 60px' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '16px', fontWeight: 800 }}>
          Learn AI <span className="hero-gradient">Playbook</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px' }}>
          Your interactive sandbox for mastering Generative AI. 
          No setup required to explore, learn, and play.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/arcade" className="btn btn-primary">
            Enter Arcade 🎮
          </Link>
          <Link href="/sandbox" className="btn" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            Open Sandbox 🧪
          </Link>
        </div>
      </section>

      {/* Launchpad Grid */}
      <section>
        <h2 style={{ marginBottom: '32px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          Launchpad
        </h2>
        <div className="grid-3">
          
          {/* Arcade Card */}
          <Link href="/arcade" className="card" style={{ display: 'block' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🎮</div>
            <h3 style={{ color: 'var(--text-primary)' }}>AI Arcade</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Gamified challenges to test your prompting skills. Play "Prompt Golf" and more.
            </p>
          </Link>

          {/* Lessons Card */}
          <Link href="/lessons" className="card" style={{ display: 'block' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📚</div>
            <h3 style={{ color: 'var(--text-primary)' }}>Lessons</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Structured learning paths from "Intro to LLMs" to advanced RAG techniques.
            </p>
          </Link>

          {/* Sandbox Card */}
          <Link href="/sandbox" className="card" style={{ display: 'block' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🧪</div>
            <h3 style={{ color: 'var(--text-primary)' }}>Sandbox</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Free-form experimentation. Bring your own key or use our limited free tier.
            </p>
          </Link>

          {/* Gallery Card */}
          <Link href="/gallery" className="card" style={{ display: 'block' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🌟</div>
            <h3 style={{ color: 'var(--text-primary)' }}>Community Gallery</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              See what others are building. Featured dashboards and creative prompts.
            </p>
          </Link>

        </div>
      </section>

      {/* Contributor Spotlight (Mock) */}
      <section style={{ marginTop: '80px', marginBottom: '80px' }}>
        <h2 style={{ marginBottom: '32px' }}>Featured Contributor</h2>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(45deg, #FF4B2B, #FF416C)' }}></div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Alex B.</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Created the "RAG in 5 minutes" lesson and the "Prompt Injection Defender" game.
            </p>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '40px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p>Built with ❤️ for the AI Community</p>
      </footer>
    </div>
  );
}
