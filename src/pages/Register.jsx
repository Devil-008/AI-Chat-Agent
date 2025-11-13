import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import Toast from '../components/Toast'

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [toast, setToast] = useState(null)
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.register({ username, email, password })
            localStorage.setItem('user', JSON.stringify(res.user))
            setToast({ message: 'Registered successfully', type: 'success' })
            setTimeout(() => navigate('/dashboard'), 700)
        } catch (err) {
            setToast({ message: err.message || 'Register failed', type: 'error' })
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Create account</h2>
                <form onSubmit={submit} className="auth-form">
                    <label>Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
                    <label>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                    <button className="btn-primary" type="submit">Register</button>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
            <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
        </div>
    )
}
