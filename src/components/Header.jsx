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
                    <span className="material-icons">menu</span>
                ) : (
                    <span className="material-icons">menu</span>

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
