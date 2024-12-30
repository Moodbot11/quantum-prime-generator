import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link href="/" className="hover:text-cyan-400">Home</Link></li>
        <li><Link href="/frequency-tools" className="hover:text-cyan-400">Frequency Tools</Link></li>
        <li><Link href="https://nov2-medbot.vercel.app/" className="hover:text-cyan-400" target="_blank" rel="noopener noreferrer">Medical Specialist Chat</Link></li>
        <li><Link href="/wave-capture" className="hover:text-cyan-400">Quantum Wave Function Capture</Link></li>
        <li><Link href="/indepth-calculator" className="hover:text-cyan-400">In-Depth Wave Analysis</Link></li>
        <li><Link href="/visual-function-analysis" className="hover:text-cyan-400">Visual Function Analysis</Link></li>
        <li><Link href="/frequency-synthesizer" className="hover:text-cyan-400">Individual Creation of Reality</Link></li>
        <li><Link href="/analyze-frequency" className="hover:text-cyan-400">Broadcast Reality Creation</Link></li>
        <li><Link href="/comments" className="hover:text-cyan-400">Comments</Link></li>
      </ul>
      <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400">
        <p>Contact: <a href="mailto:wavepatternmath@gmail.com" className="hover:text-cyan-400">wavepatternmath@gmail.com</a></p>
        <p>&copy; 2023 Mark Lance Moody. All rights reserved.</p>
      </div>
    </nav>
  )
}

export default Navigation

