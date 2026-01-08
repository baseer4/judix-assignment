import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FiEdit, FiZap, FiShield } from 'react-icons/fi'

function HomePage() {
  return (
    <div className="w-full bg-black">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                circle at center,
                rgba(139, 92, 246, 0.08) 0%,
                rgba(0, 0, 0, 0.0) 60%
              )
            `,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-24 text-center">
          <h1 className="text-6xl md:text-7xl font-semibold text-white mb-6 tracking-tight">
            Notes app
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Capture your thoughts, organize your ideas, and never forget a thing
          </p>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
            A simple and powerful way to take notes and keep your life organized
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-purple-600 hover:bg-purple-700 text-white">
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-white/20 text-black hover:bg-white/90">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Why choose Notes app?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4">
              <FiEdit className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Simple Interface</h3>
            <p className="text-white/60">
              Clean and intuitive design that gets out of your way. Focus on your thoughts, not the tool.
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4">
              <FiZap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
            <p className="text-white/60">
              Built for speed. Create, edit, and search through your notes instantly without any lag.
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4">
              <FiShield className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Secure & Private</h3>
            <p className="text-white/60">
              Your notes are encrypted and stored securely. Your privacy is our top priority.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          How it works
        </h2>
        <div className="space-y-8">
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Create an account</h3>
              <p className="text-white/60">
                Sign up in seconds with just your email. No complicated setup required.
              </p>
            </div>
          </div>
          
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Start taking notes</h3>
              <p className="text-white/60">
                Begin writing your notes immediately. Organize them however you like.
              </p>
            </div>
          </div>
          
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Stay organized</h3>
              <p className="text-white/60">
                Keep all your thoughts in one place. Search and find what you need instantly.
              </p>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}

export default HomePage

