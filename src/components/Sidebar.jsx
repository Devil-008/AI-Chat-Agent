import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Sidebar({ visible }) {
    const navigate = useNavigate()
    if (!visible) return null

    const user = (() => { try { return JSON.parse(localStorage.getItem('user')) } catch { return null } })()

    const handleLogout = async () => {
        try { await api.logout() } catch { }
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <aside className="app-sidebar">
            <nav>
                <ul>
                    <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
                    {/* <li><NavLink to="/api-handling" className={({ isActive }) => isActive ? 'active' : ''}>API Handling</NavLink></li> */}
                </ul>
            </nav>
            <div className="sidebar-footer">
                {user && (
                    <button className="sidebar-logout" onClick={handleLogout}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Logout</span>
                    </button>
                )}
            </div>
        </aside>
    )
}
