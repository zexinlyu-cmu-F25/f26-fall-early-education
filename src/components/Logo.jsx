export default function Logo({ className = '' }) {
  return (
    <a href="#" className={`flex items-center ${className}`}>
      <img src="/kiddash-logo.png" alt="KidDash" className="h-11 w-auto" />
    </a>
  )
}
