import { useState } from 'react';

export default function PromptGolf() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Mock LLM response for the demo
    const checkPrompt = async () => {
        setLoading(true);
        // Simulate API delay
        await new Promise(r => setTimeout(r, 1000));

        const wordCount = input.trim().split(/\s+/).length;

        // Simple mock logic: If prompt contains "yellow" and "fruit", it wins
        const isSuccess = input.toLowerCase().includes('yellow') && input.toLowerCase().includes('fruit');

        setResult({
            success: isSuccess,
            message: isSuccess
                ? `Success! You got the AI to say "Banana" in ${wordCount} words.`
                : "Failed. The AI didn't say 'Banana'. Try describing it!",
            score: isSuccess ? wordCount : null
        });
        setLoading(false);
    };

    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>⛳ Prompt Golf</h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Goal: Make the AI say <strong>"Banana"</strong> using the fewest words possible.
                </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your prompt here..."
                    style={{
                        width: '100%',
                        height: '100px',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontFamily: 'inherit',
                        resize: 'none'
                    }}
                />
                <div style={{ textAlign: 'right', marginTop: '8px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    Word Count: {input.trim() ? input.trim().split(/\s+/).length : 0}
                </div>
            </div>

            <button
                onClick={checkPrompt}
                disabled={loading || !input.trim()}
                className="btn btn-primary"
                style={{ width: '100%' }}
            >
                {loading ? 'Swinging... 🏌️' : 'Putt (Submit Prompt)'}
            </button>

            {result && (
                <div style={{
                    marginTop: '24px',
                    padding: '16px',
                    borderRadius: '8px',
                    background: result.success ? 'rgba(50, 255, 100, 0.1)' : 'rgba(255, 50, 50, 0.1)',
                    border: `1px solid ${result.success ? '#32d966' : '#d93232'}`,
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: result.success ? '#32d966' : '#d93232', marginBottom: '8px' }}>
                        {result.success ? 'Hole in One! (Sort of)' : 'Missed!'}
                    </h3>
                    <p>{result.message}</p>
                    {result.score && (
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '16px' }}>
                            Score: {result.score}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
