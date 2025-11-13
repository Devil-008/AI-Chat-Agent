import React, { useEffect, useRef, useState } from 'react'
import api from '../services/api'
import TypingDots from './TypingDots'

export default function Chat() {
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('')
    const [waiting, setWaiting] = useState(false)
    const endRef = useRef(null)

    // Initial handshake message per API requirement (message: " ")
    useEffect(() => {
        let cancelled = false
        async function init() {
            try {
                const res = await api.chat(' ')
                if (!cancelled && res?.reply) {
                    setMessages([{ id: Date.now(), text: res.reply, from: 'system' }])
                }
            } catch (e) {
                if (!cancelled) setMessages([{ id: Date.now(), text: 'Unable to connect to chat service.', from: 'system' }])
            }
        }
        init()
        return () => { cancelled = true }
    }, [])

    // Auto scroll to bottom on new messages or while waiting for reply
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, waiting])

    const send = async () => {
        const toSend = text.trim()
        if (!toSend || waiting) return
        const userMsg = { id: Date.now(), text: toSend, from: 'me' }
        setMessages((m) => [...m, userMsg])
        setText('')
        try {
            setWaiting(true)
            const res = await api.chat(toSend)
            const reply = res?.reply ?? ''
            if (reply) {
                setMessages((m) => [...m, { id: Date.now() + 1, text: reply, from: 'system' }])
            }
        } catch (e) {
            setMessages((m) => [...m, { id: Date.now() + 2, text: 'Error getting reply. Please try again.', from: 'system' }])
        } finally {
            setWaiting(false)
        }
    }

    return (
        <div className="chat">
            <div className="chat-window">
                {messages.map((m) => (
                    <div key={m.id} className={`msg ${m.from}`}>
                        {m.text}
                    </div>
                ))}
                {waiting && (
                    <div className="msg system">
                        <TypingDots />
                    </div>
                )}
                <div ref={endRef} />
            </div>
            <div className="chat-input">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') send() }}
                    placeholder={waiting ? 'Waiting for reply…' : 'Type a message...'}
                    disabled={waiting}
                />
                <button onClick={send} className="btn-primary" disabled={waiting}>
                    {waiting ? '...' : 'Send'} <span className="material-icons" style={{fontSize:'18px',verticalAlign:'middle'}}>send</span>
                </button>
               
            </div>
        </div>
    )
}
