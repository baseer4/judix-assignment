import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '../store/useAuthStore'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, isLoggingIn } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      await login({ email, password })
      navigate('/notes')
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="h-[calc(100vh-6rem)] flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-white">Login</CardTitle>
          <CardDescription className="text-center text-white/70">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoggingIn}
                className="bg-white/5 border-white/10 text-white placeholder-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoggingIn}
                className="bg-white/5 border-white/10 text-white placeholder-white/50"
              />
            </div>
            {error && (
              <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded p-2">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white" 
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-white/70">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-400 hover:text-purple-300 hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage

