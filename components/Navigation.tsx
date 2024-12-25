import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link href="/" className="hover:text-cyan-400">Home</Link></li>
        <li><Link href="/frequency-tools" className="hover:text-cyan-400">Frequency Tools</Link></li>
        <li><Link href="/wave-capture" className="hover:text-cyan-400">Wave Capture</Link></li>
        <li><Link href="/wave-manipulation" className="hover:text-cyan-400">Wave Manipulation</Link></li>
        <li><Link href="/frequency-synthesizer" className="hover:text-cyan-400">Frequency Synthesizer</Link></li>
        <li><Link href="/analyze-frequency" className="hover:text-cyan-400">Analyze Frequency</Link></li>
        <li><Link href="/comments" className="hover:text-cyan-400">Comments</Link></li>
      </ul>
    </nav>
  )
}

export default Navigation

