import React from 'react'

export default function Header({ sidebarOpen, onToggleSidebar }) {
    const user = (() => { try { return JSON.parse(localStorage.getItem('user')) } catch { return null } })()
    const initial = (() => {
        const base = (user?.username || user?.email || '').trim()
        return base ? base.charAt(0).toUpperCase() : '?'
    })()

    return (
        <header className="app-header">
            <button
                className="sidebar-toggle"
                type="button"
                aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                onClick={onToggleSidebar}
            >
                {sidebarOpen ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6l12 12M6 18L18 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M3 12h14M3 18h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                )}
            </button>
            <div className="brand">AI chat Agent</div>
            <div className="header-right">
                {user ? (
                    <div className="user-info">
                        <div className="user-meta">
                            <div className="user-name">{user.username}</div>
                            <div className="user-email">{user.email}</div>
                        </div>
                        <div className="user-avatar" aria-hidden>{initial}</div>
                    </div>
                ) : null}
            </div>
        </header>
    )
}
