import React, { useEffect } from 'react'

export default function Toast({ message, type = 'info', onClose }) {
    useEffect(() => {
        if (!message) return
        const id = setTimeout(() => onClose && onClose(), 3500)
        return () => clearTimeout(id)
    }, [message])

    if (!message) return null

    return (
        <div className={`toast toast-${type}`} onClick={() => onClose && onClose()}>
            {message}
        </div>
    )
}
