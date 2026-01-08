import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

function ProtectedRoute() {
  const { authUser, isCheckingAuth } = useAuthStore()
  
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }
  
  return authUser ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute

