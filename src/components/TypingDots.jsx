import React from 'react'
import './TypingDots.css'

export default function TypingDots({ label = 'Typing…' }) {
    return (
        <div className="typing-wrap">
            <div className="typing-box" aria-label={label}>
                <span />
                <span />
                <span />
            </div>
        </div>
    )
}
