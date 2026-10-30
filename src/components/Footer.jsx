import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="pb-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <Logo />
        <p className="font-hand text-xl text-cocoa">made with care · CMU Fall 2026 · © {new Date().getFullYear()} KidDash</p>
      </div>
    </footer>
  )
}
