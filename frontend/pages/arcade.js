import Head from 'next/head';
import Link from 'next/link';
import PromptGolf from '../components/games/PromptGolf';
import InjectionDefender from '../components/games/InjectionDefender';
import StyleTransferRacer from '../components/games/StyleTransferRacer';

export default function Arcade() {
    return (
        <div className="container">
            <Head>
                <title>Learn AI Playbook | Arcade</title>
            </Head>

            <div style={{ padding: '40px 0' }}>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'var(--text-secondary)' }}>
                    ← Back to Launchpad
                </Link>

                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>
                        AI <span className="hero-gradient">Arcade</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                        Test your skills with interactive GenAI challenges.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '1000px', margin: '0 auto' }}>
                    {/* Game 1: Prompt Golf */}
                    <div>
                        <PromptGolf />
                    </div>

                    {/* Game 2: Injection Defender */}
                    <div>
                        <InjectionDefender />
                    </div>

                    {/* Game 3: Style Transfer Racer */}
                    <div>
                        <StyleTransferRacer />
                    </div>
                </div>
            </div>
        </div>
    );
}
