import { useState, useEffect } from 'react';

export default function StyleTransferRacer() {
    const [input, setInput] = useState('');
    const [targetStyle, setTargetStyle] = useState('Pirate');
    const [score, setScore] = useState(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isActive, setIsActive] = useState(false);
    const [phrase, setPhrase] = useState("Hello friend, how are you today?");

    const styles = {
        'Pirate': { keywords: ['arr', 'matey', 'ahoy', 'ye', 'ship', 'sea'], example: "Ahoy matey! How be ye today?" },
        'Shakespeare': { keywords: ['thou', 'hath', 'art', 'dost', 'verily', 'thee'], example: "Hail, good sir! How art thou this day?" },
        'Tech Bro': { keywords: ['disrupt', 'scale', 'leverage', 'synergy', 'stack', 'crypto'], example: "Hey, just wanted to sync up and leverage our synergy." }
    };

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            checkScore();
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const startGame = (style) => {
        setTargetStyle(style);
        setPhrase("The quick brown fox jumps over the lazy dog.");
        setInput('');
        setScore(null);
        setTimeLeft(30);
        setIsActive(true);
    };

    const checkScore = () => {
        const keywords = styles[targetStyle].keywords;
        let matches = 0;
        const lowerInput = input.toLowerCase();

        keywords.forEach(word => {
            if (lowerInput.includes(word)) matches++;
        });

        // Simple heuristic score: 20 points per keyword + length bonus
        let calculatedScore = Math.min(100, (matches * 20) + (input.length > 10 ? 10 : 0));

        setScore({
            points: calculatedScore,
            message: calculatedScore > 60 ? "Great Style!" : "Needs more flavor!",
            matches: matches
        });
        setIsActive(false);
    };

    return (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🎨 Style Transfer Racer</h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Goal: Rewrite the phrase in the target style before time runs out!
                </p>
            </div>

            {!isActive && !score && (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ marginBottom: '16px' }}>Choose a Style to Start:</p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        {Object.keys(styles).map(style => (
                            <button
                                key={style}
                                onClick={() => startGame(style)}
                                className="btn"
                                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                            >
                                {style}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {(isActive || score) && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        <span style={{ color: 'var(--accent-primary)' }}>Style: {targetStyle}</span>
                        <span style={{ color: timeLeft < 10 ? '#ff4b4b' : 'var(--text-primary)' }}>⏱️ {timeLeft}s</span>
                    </div>

                    <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Original Phrase:</p>
                        <p style={{ fontSize: '1.2rem', margin: '8px 0 0' }}>"{phrase}"</p>
                    </div>

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={!isActive}
                        placeholder={`Rewrite this as a ${targetStyle}... (Hint: use words like ${styles[targetStyle].keywords.slice(0, 3).join(', ')})`}
                        style={{
                            width: '100%',
                            height: '120px',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontFamily: 'inherit',
                            fontSize: '1.1rem',
                            resize: 'none'
                        }}
                    />

                    {isActive && (
                        <button
                            onClick={checkScore}
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '16px' }}
                        >
                            Submit Early 🏁
                        </button>
                    )}
                </div>
            )}

            {score && (
                <div style={{
                    marginTop: '24px',
                    padding: '24px',
                    borderRadius: '8px',
                    background: score.points > 60 ? 'rgba(50, 255, 100, 0.1)' : 'rgba(255, 50, 50, 0.1)',
                    border: `1px solid ${score.points > 60 ? '#32d966' : '#d93232'}`,
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '8px' }}>
                        {score.points > 80 ? '🏆' : score.points > 60 ? '👍' : '🤔'}
                    </div>
                    <h3 style={{ fontSize: '2rem', margin: '0 0 8px', color: score.points > 60 ? '#32d966' : '#d93232' }}>
                        {score.points} Points
                    </h3>
                    <p style={{ fontSize: '1.2rem' }}>{score.message}</p>
                    <p style={{ color: 'var(--text-secondary)' }}>You used {score.matches} style keywords.</p>

                    <button
                        onClick={() => setScore(null)}
                        className="btn btn-primary"
                        style={{ marginTop: '24px' }}
                    >
                        Play Again 🔄
                    </button>
                </div>
            )}
        </div>
    );
}
