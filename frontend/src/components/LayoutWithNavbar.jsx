import { useState, useRef, useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

function LayoutWithNavbar() {
  const { authUser, logout } = useAuthStore()
  const navigate = useNavigate()
  const [showProfile, setShowProfile] = useState(false)
  const profileRef = useRef(null)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false)
      }
    }

    if (showProfile) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProfile])

  return (
    <div className="min-h-screen bg-black">
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md supports-[backdrop-filter]:bg-black/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">Notes app</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link 
                to="/about" 
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                About
              </Link>
              {authUser ? (
                <>
                  <Link 
                    to="/notes" 
                    className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                  >
                    Notes
                  </Link>
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setShowProfile(!showProfile)}
                      className="flex items-center space-x-2 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                        {getInitials(authUser.fullName)}
                      </div>
                      <div className="hidden md:block text-left">
                        <div className="text-sm font-medium text-white">
                          {authUser.fullName}
                        </div>
                        <div className="text-xs text-white/60">
                          {authUser.email}
                        </div>
                      </div>
                    </button>
                    {showProfile && (
                      <div className="absolute right-0 mt-2 w-56 bg-white/10 backdrop-blur-md border border-white/10 rounded-md shadow-lg overflow-hidden">
                        <div className="px-4 py-3 border-b border-white/10">
                          <div className="text-sm font-medium text-white">
                            {authUser.fullName}
                          </div>
                          <div className="text-xs text-white/60 mt-1">
                            {authUser.email}
                          </div>
                        </div>
                        <Link
                          to="/profile"
                          onClick={() => setShowProfile(false)}
                          className="block w-full text-left px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          Profile Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/signup" 
                    className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                  >
                    Signup
                  </Link>
                  <Link 
                    to="/login" 
                    className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutWithNavbar

