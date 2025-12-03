import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Sandbox() {
    const router = useRouter();
    const [apiKey, setApiKey] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('You are a helpful AI assistant.');
    const [userPrompt, setUserPrompt] = useState('Explain quantum computing in one sentence.');
    const [temperature, setTemperature] = useState(0.7);
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('mock'); // 'mock' or 'real'

    useEffect(() => {
        if (router.query.prompt) {
            setUserPrompt(router.query.prompt);
        }
    }, [router.query.prompt]);

    const runSandbox = async () => {
        setLoading(true);
        setResponse('');

        try {
            if (mode === 'mock') {
                // Simulate network delay
                await new Promise(r => setTimeout(r, 1000));

                // Mock logic based on temperature
                let mockRes = "This is a simulated response.\n\n";
                if (temperature > 0.8) {
                    mockRes += "Whoa! High temperature! The universe is a giant donut made of quantum sprinkles! 🍩✨";
                } else if (temperature < 0.3) {
                    mockRes += "Quantum computing uses qubits to perform calculations based on probability.";
                } else {
                    mockRes += "Quantum computing leverages quantum mechanics to solve complex problems faster than classical computers.";
                }
                setResponse(mockRes);
            } else {
                // Real API Call (Client-side)
                if (!apiKey) {
                    setResponse("Error: Please enter an API Key for Real Mode.");
                    setLoading(false);
                    return;
                }

                const res = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey} `
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: userPrompt }
                        ],
                        temperature: parseFloat(temperature)
                    })
                });

                const data = await res.json();
                if (data.error) {
                    setResponse(`Error: ${data.error.message} `);
                } else {
                    setResponse(data.choices[0].message.content);
                }
            }
        } catch (err) {
            setResponse(`Error: ${err.message} `);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <Head>
                <title>Learn AI Playbook | Sandbox</title>
            </Head>

            <div style={{ marginBottom: '40px' }}>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'var(--text-secondary)' }}>
                    ← Back to Launchpad
                </Link>
                <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>
                    AI <span className="hero-gradient">Sandbox</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                    Experiment with prompts, temperature, and models in real-time.
                </p>
            </div>

            <div className="grid-2" style={{ display: 'grid', gap: '32px', gridTemplateColumns: '300px 1fr' }}>

                {/* Controls Sidebar */}
                <div className="card">
                    <h3 style={{ marginTop: 0, marginBottom: '24px' }}>Configuration</h3>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Mode</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={() => setMode('mock')}
                                className="btn"
                                style={{
                                    flex: 1,
                                    background: mode === 'mock' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                                    color: mode === 'mock' ? 'white' : 'var(--text-secondary)'
                                }}
                            >
                                Mock 🧪
                            </button>
                            <button
                                onClick={() => setMode('real')}
                                className="btn"
                                style={{
                                    flex: 1,
                                    background: mode === 'real' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                                    color: mode === 'real' ? 'white' : 'var(--text-secondary)'
                                }}
                            >
                                Real 🔑
                            </button>
                        </div>
                    </div>

                    {mode === 'real' && (
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>OpenAI API Key</label>
                            <input
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="sk-..."
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'white' }}
                            />
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                Key is stored only in your browser.
                            </p>
                        </div>
                    )}

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                            Temperature: {temperature}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={temperature}
                            onChange={(e) => setTemperature(e.target.value)}
                            style={{ width: '100%' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            <span>Precise</span>
                            <span>Creative</span>
                        </div>
                    </div>

                    <button
                        onClick={runSandbox}
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                    >
                        {loading ? 'Running...' : 'Run Prompt ▶'}
                    </button>
                </div>

                {/* Main Editor */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* System Prompt */}
                    <div className="card" style={{ padding: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--accent-primary)' }}>System Prompt</label>
                        <textarea
                            value={systemPrompt}
                            onChange={(e) => setSystemPrompt(e.target.value)}
                            style={{ width: '100%', height: '80px', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontFamily: 'monospace', resize: 'vertical' }}
                        />
                    </div>

                    {/* User Prompt */}
                    <div className="card" style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#32d966' }}>User Prompt</label>
                        <textarea
                            value={userPrompt}
                            onChange={(e) => setUserPrompt(e.target.value)}
                            style={{ width: '100%', minHeight: '120px', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontFamily: 'monospace', resize: 'vertical', flex: 1 }}
                        />
                    </div>

                    {/* Output */}
                    <div className="card" style={{ padding: '16px', minHeight: '150px', background: 'var(--bg-secondary)' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--text-secondary)' }}>Output</label>
                        {response ? (
                            <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{response}</div>
                        ) : (
                            <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>Run the prompt to see the output...</div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
