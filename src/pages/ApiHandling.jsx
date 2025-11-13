import React, { useState } from 'react'
import api from '../services/api'

export default function ApiHandling() {
    const [out, setOut] = useState(null)

    const callLogin = async () => {
        try {
            const res = await api.login({ email: 'rup@example.com', password: '123rup' })
            setOut(JSON.stringify(res, null, 2))
        } catch (e) { setOut(JSON.stringify(e, null, 2)) }
    }

    const callRegister = async () => {
        try {
            const res = await api.register({ username: '5151', email: '5151@example.com', password: '123454rup' })
            setOut(JSON.stringify(res, null, 2))
        } catch (e) { setOut(JSON.stringify(e, null, 2)) }
    }

    const callLogout = async () => {
        try {
            const res = await api.logout()
            setOut(JSON.stringify(res, null, 2))
            localStorage.removeItem('user')
        } catch (e) { setOut(JSON.stringify(e, null, 2)) }
    }

    return (
        <div className="api-page">
            <h2>API Handling</h2>
            <div className="api-buttons">
                <button className="btn" onClick={callLogin}>Call Login (example)</button>
                <button className="btn" onClick={callRegister}>Call Register (example)</button>
                <button className="btn" onClick={callLogout}>Call Logout</button>
            </div>
            <pre className="api-out">{out}</pre>
        </div>
    )
}
