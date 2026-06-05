import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Pillars from './components/Pillars'
import InteractiveZone from './components/InteractiveZone'
import AuthorityShowcase from './components/AuthorityShowcase'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-void text-text-primary overflow-x-hidden">
      <Navbar />
      <Hero />
      <Pillars />
      <InteractiveZone />
      <AuthorityShowcase />
      <Footer />
    </div>
  )
}
