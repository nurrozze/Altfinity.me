import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, Check, User, Mail, MessageSquare } from 'lucide-react'

export default function ContactForm() {
  const [formState, setFormState] = useState('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const outerTimerRef = useRef(null)
  const innerTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      clearTimeout(outerTimerRef.current)
      clearTimeout(innerTimerRef.current)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formState !== 'idle') return
    setFormState('sending')
    outerTimerRef.current = setTimeout(() => {
      setFormState('sent')
      innerTimerRef.current = setTimeout(() => {
        setFormState('idle')
        setForm({ name: '', email: '', message: '' })
      }, 3000)
    }, 1500)
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '12px 16px 12px 40px',
    fontSize: '0.875rem',
    color: '#ffffff',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  }

  return (
    <div id="contact">
      <h3
        className="text-xs font-medium uppercase tracking-[0.2em] mb-8"
        style={{ color: '#4a4a4a' }}
      >
        Get In Touch
      </h3>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl p-6 md:p-8"
        style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#161616' }}
      >
        {formState === 'sent' ? (
          <div className="text-center py-10">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.20)' }}
            >
              <Check size={28} style={{ color: '#10b981' }} />
            </div>
            <h4 className="text-lg font-bold text-white tracking-tight mb-2">Message Sent</h4>
            <p className="text-sm" style={{ color: '#8c8c8c' }}>We'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'contact-name', name: 'name', type: 'text', placeholder: 'Your name', Icon: User, value: form.name },
                { id: 'contact-email', name: 'email', type: 'email', placeholder: 'you@email.com', Icon: Mail, value: form.email },
              ].map(({ id, name, type, placeholder, Icon, value }) => (
                <div key={name}>
                  <label
                    htmlFor={id}
                    className="block text-xs uppercase tracking-wider mb-2"
                    style={{ color: '#4a4a4a', fontWeight: 500 }}
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </label>
                  <div className="relative">
                    <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#4a4a4a' }} />
                    <input
                      id={id}
                      type={type}
                      name={name}
                      value={value}
                      onChange={handleChange}
                      placeholder={placeholder}
                      required
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.25)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs uppercase tracking-wider mb-2"
                style={{ color: '#4a4a4a', fontWeight: 500 }}
              >
                Message
              </label>
              <div className="relative">
                <MessageSquare size={14} className="absolute left-3 top-3.5" style={{ color: '#4a4a4a' }} />
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={4}
                  required
                  style={{ ...inputStyle, padding: '12px 16px 12px 40px', resize: 'none' }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.25)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                />
              </div>
            </div>

            <button
              id="contact-submit"
              type="submit"
              disabled={formState === 'sending'}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-medium uppercase tracking-wider transition-all duration-200 disabled:opacity-40 disabled:cursor-wait"
              style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.80)', background: 'transparent' }}
              onMouseEnter={(e) => {
                if (formState !== 'sending') {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
                  e.currentTarget.style.color = '#ffffff'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.80)'
              }}
            >
              {formState === 'sending' ? (
                <>
                  <div
                    className="w-4 h-4 rounded-full animate-spin"
                    style={{ border: '2px solid rgba(255,255,255,0.15)', borderTopColor: 'rgba(255,255,255,0.70)' }}
                  />
                  Sending…
                </>
              ) : (
                <>
                  <Send size={14} />
                  Book a Consultation
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
