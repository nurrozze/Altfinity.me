import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, Check, User, Mail, MessageSquare } from 'lucide-react'

export default function ContactForm() {
  const [formState, setFormState] = useState('idle') // idle | sending | sent
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  // Bug 7 fix: store timer handles in refs and cancel on unmount
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div id="contact">
      <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-6">Get In Touch</h3>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-2xl p-6 md:p-8 glow-border-gold"
      >
        {formState === 'sent' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-success" />
            </div>
            <h4 className="text-xl font-bold text-text-primary mb-2">Message Sent!</h4>
            <p className="text-sm text-text-secondary">We'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2 block">
                  Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:border-gold/50 transition-colors duration-300"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-email" className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2 block">
                  Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:border-gold/50 transition-colors duration-300"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2 block">
                Message
              </label>
              <div className="relative">
                <MessageSquare size={16} className="absolute left-3 top-3.5 text-text-muted" />
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={4}
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none focus:border-gold/50 transition-colors duration-300 resize-none"
                />
              </div>
            </div>

            <button
              id="contact-submit"
              type="submit"
              disabled={formState === 'sending'}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-gold/15 to-silver/10 text-text-primary font-medium text-sm hover:from-gold/25 hover:to-silver/15 glow-border-gold transition-all duration-300 disabled:opacity-60 disabled:cursor-wait"
            >
              {formState === 'sending' ? (
                <>
                  <div className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
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
