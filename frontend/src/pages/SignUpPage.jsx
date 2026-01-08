import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '../store/useAuthStore'

function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const { signup, isSigningUp } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      await signup({ fullName: name, email, password })
      navigate('/notes')
    } catch (error) {
      setError(error.response?.data?.message || 'Signup failed. Please try again.')
    }
  }

  return (
    <div className="h-[calc(100vh-6rem)] flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-white">Create an account</CardTitle>
          <CardDescription className="text-center text-white/70">
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSigningUp}
                className="bg-white/5 border-white/10 text-white placeholder-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSigningUp}
                className="bg-white/5 border-white/10 text-white placeholder-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isSigningUp}
                className="bg-white/5 border-white/10 text-white placeholder-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isSigningUp}
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
              disabled={isSigningUp}
            >
              {isSigningUp ? 'Creating account...' : 'Sign up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-white/70">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 hover:underline font-medium">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUpPage

