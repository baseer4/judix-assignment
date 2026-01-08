import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import LayoutWithNavbar from './components/LayoutWithNavbar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PageNotFound from './pages/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import NotesPage from './pages/NotesPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <Routes>
        <Route element={<LayoutWithNavbar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route 
            path="/signup" 
            element={!authUser ? <SignUpPage /> : <Navigate to="/notes" replace />} 
          />
          <Route 
            path="/login" 
            element={!authUser ? <LoginPage /> : <Navigate to="/notes" replace />} 
          />
          <Route path="*" element={<PageNotFound />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
