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
                    // Google "close" icon (Material Design)
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                        <path
                            fill="#fff"
                            d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 
                   5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12Z"
                        />
                    </svg>
                ) : (
                    // Google "menu" icon (Material Design)
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                        <path
                            fill="#fff"
                            d="M3 6h18v2H3Zm0 5h18v2H3Zm0 5h18v2H3Z"
                        />
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
