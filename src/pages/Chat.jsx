import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const Chat = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { mobile, username } = location.state || {}

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Helper functions
  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }])
  }

  const addTypingAnimation = () => {
    const id = Date.now()
    addMessage('...', 'bot')
    return id
  }

  const removeMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.text !== '...'))
  }

  // ✅ Fixed handleSend
  async function handleSend() {
    const trimmed = message.trim()
    if (!trimmed) return

    addMessage(trimmed, 'user')
    setMessage('') // clear input box

    const loadingId = addTypingAnimation()

    try {
      const response = await fetch('http://167.235.241.103:8000/process-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })

      const data = await response.json()
      removeMessage(loadingId)
      addMessage(data.reply || 'No response received', 'bot')
    } catch (error) {
      removeMessage(loadingId)
      addMessage('Error: Could not connect to the server', 'bot')
      console.error('Error:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-100 to-purple-100 p-6">
      <div className="w-full max-w-2xl">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-200 flex flex-col h-[80vh]">
          <button
            onClick={() => navigate('/')}
            className="absolute top-6 left-6 w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center shadow-lg transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-800" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Chat Bot</h3>
          </div>

          {/* Messages Area */}
          <div className="flex-1 bg-gray-50 rounded-xl p-4 overflow-y-auto mb-4">
            <div className="text-center mt-4">
              <h1 className="text-lg font-semibold text-black-200">
                Hello {username},
              </h1>
              <h2 className="text-sm text-gray-400">
                Welcome back to the chat!
              </h2>
            </div>

            {messages.length === 0 && (
              <div className="flex justify-center mt-12">
                <span className="bg-gray-200 text-gray-600 text-sm px-4 py-1 rounded-full">
                  No messages yet
                </span>
              </div>
            )}

            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-xs break-words ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-green-300 to-green-300 text-gray-800'
                        : 'bg-white/70 text-gray-700'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 text-lg font-medium border border-gray-200
                       focus:outline-none focus:border-blue-300 focus:bg-white/90 transition-all duration-300"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-500 text-black font-bold rounded-xl shadow-2xl
                         hover:shadow-blue-300/25 transform hover:scale-[1.02] transition-all duration-300"
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
