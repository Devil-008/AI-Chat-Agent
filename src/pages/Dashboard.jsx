import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Chat from '../components/Chat'

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="app-root">
            <Header
                sidebarOpen={sidebarOpen}
                onToggleSidebar={() => setSidebarOpen((v) => !v)}
            />
            <div className="app-body">
                <Sidebar visible={sidebarOpen} />
                <main className="app-main">
                    <section className="panel">
                        <h3>Chat</h3>
                        <Chat />
                    </section>
                </main>
            </div>
        </div>
    )
}
