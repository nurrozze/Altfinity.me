import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Pillars from './components/Pillars'
import InteractiveZone from './components/InteractiveZone'
import AuthorityShowcase from './components/AuthorityShowcase'
import Footer from './components/Footer'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <div className="min-h-screen bg-void text-text-primary overflow-x-hidden">
      <AnimatePresence>
        {!splashDone && (
          <SplashScreen key="splash" onComplete={() => setSplashDone(true)} />
        )}
      </AnimatePresence>

      <Navbar />
      <Hero splashDone={splashDone} />
      <Pillars />
      <InteractiveZone />
      <AuthorityShowcase />
      <Footer />
    </div>
  )
}
