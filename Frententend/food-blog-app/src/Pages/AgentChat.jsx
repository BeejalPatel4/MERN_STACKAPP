

import { useState } from 'react'
import axios from 'axios'

export default function AgentChat() {
  const [input, setInput] = useState('')
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false)

  const askAgent = async () => {
    if (!input.trim()) return
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:3000/agent', { input })
      setReply(res.data.reply)
    } catch (err) {
      setReply("Hmm... I couldn't reach the server. Try again?")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        maxWidth: '100%',
        height:'600px',
        margin: '3rem auto',
        padding: '2rem',
        backgroundColor: '#fdf6f0',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        fontFamily: 'Segoe UI, sans-serif',
        textAlign:'center',
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#d95d39' }}>
        🍲 Chat with the Recipe Assistant
      </h2>
      <textarea
        placeholder="Ask something like: Suggest a Gujarati street food..."
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        style={{
          width: '900px',
          padding: '1rem',
          fontSize: '1rem',
          marginBottom: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          resize: 'vertical',

        }}
      />
      <button
        onClick={askAgent}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#aaa' : '#d95d39',
          color: 'white',
          padding: '0.8rem 1.2rem',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Thinking...' : 'Ask the Agent'}
      </button>
      {reply && (
        <div
          style={{
            marginTop: '1.5rem',
            backgroundColor: '#fffbe6',
            padding: '1rem',
            borderLeft: '5px solid #d95d39',
            borderRadius: '6px'
          }}
        >
          <strong>Agent:</strong> {reply}
        </div>
      )}
    </div>
  )
}
