import { MotionConfig } from 'motion/react'
import Filters from './components/Filters.jsx'
import Navbar from './components/Navbar.jsx'
import Marquee from './components/Marquee.jsx'
import StickyNotes from './components/StickyNotes.jsx'
import Handoff from './components/Handoff.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Schoolyard from './components/Schoolyard.jsx'
import Features from './components/Features.jsx'
import Audience from './components/Audience.jsx'
import CallToAction from './components/CallToAction.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip font-sans antialiased">
        <Filters />
        <Navbar />
        <main>
          <Handoff />
          <Marquee />
          <StickyNotes />
          <HowItWorks />
          <Features />
          <Audience />
          <CallToAction />
          <Schoolyard />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
