import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import Toast from '../components/Toast'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [toast, setToast] = useState(null)
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.login({ email, password })
            localStorage.setItem('user', JSON.stringify(res.user))
            setToast({ message: 'Login successful', type: 'success' })
            setTimeout(() => navigate('/dashboard'), 600)
        } catch (err) {
            setToast({ message: err.message || 'Login failed', type: 'error' })
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Welcome back</h2>
                <form onSubmit={submit} className="auth-form">
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
                    <label>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                    <br></br>
                    <button className="btn-primary" type="submit">Login</button>
                </form>
                <p>Don't have an account <Link to="/register">Register</Link></p>
            </div>
            <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
        </div>
    )
}
