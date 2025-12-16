import { useState } from 'react'
import axios from 'axios'

export default function AgentChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false)

  const askAgent = async () => {
    if (!input.trim()) return
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:3000/agent', { input })
      setReply(res.data.reply)
    } catch {
      setReply("Hmm... I couldn't reach the server. Try again?")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '12px 16px',
          backgroundColor: '#d95d39',
          color: 'white',
          borderRadius: '50%',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
        }}
      >
        💬
      </button>

      {/* Modal Chat Box */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '320px',
            backgroundColor: '#fdf6f0',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            padding: '1rem',
            zIndex: 1000,
            fontFamily: 'Segoe UI, sans-serif'
          }}
        >
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'transparent',
              border: 'none',
              fontSize: '1rem',
              cursor: 'pointer',
              color: '#999'
            }}
          >
            ❌
          </button>
          <h4 style={{ marginBottom: '1rem', color: '#d95d39' }}>Chat with Agent</h4>
          <textarea
            placeholder="Type your question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              padding: '0.5rem',
              fontSize: '0.9rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              marginBottom: '0.5rem',
              resize: 'none'
            }}
          />
          <button
            onClick={askAgent}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#d95d39',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Thinking...' : 'Ask'}
          </button>
          {reply && (
            <div style={{
              marginTop: '1rem',
              backgroundColor: '#fffbe6',
              padding: '0.5rem',
              borderLeft: '4px solid #d95d39',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}>
              <strong>Agent:</strong> {reply}
            </div>
          )}
        </div>
      )}
    </>
  )
}
