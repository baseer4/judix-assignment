import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '../store/useAuthStore'

function ProfilePage() {
  const { authUser, updateProfile, updatePassword, isSigningUp } = useAuthStore()
  const navigate = useNavigate()
  
  const [fullName, setFullName] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    if (authUser) {
      setFullName(authUser.fullName || '')
    }
  }, [authUser])

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!fullName.trim()) {
      setError('Full name is required')
      return
    }

    try {
      await updateProfile({ fullName })
      setSuccess('Profile updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile. Please try again.')
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All password fields are required')
      return
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    try {
      await updatePassword({ currentPassword, newPassword })
      setSuccess('Password updated successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update password. Please try again.')
    }
  }

  if (!authUser) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-black p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-white/70">Manage your account information</p>
        </div>

        <div className="flex space-x-4 mb-6 border-b border-white/10">
          <button
            onClick={() => {
              setActiveTab('profile')
              setError('')
              setSuccess('')
            }}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'profile'
                ? 'text-white border-b-2 border-purple-600'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => {
              setActiveTab('password')
              setError('')
              setSuccess('')
            }}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'password'
                ? 'text-white border-b-2 border-purple-600'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Change Password
          </button>
        </div>

        {success && (
          <div className="mb-4 text-sm text-green-400 bg-green-400/10 border border-green-400/20 rounded p-3">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded p-3">
            {error}
          </div>
        )}

        {activeTab === 'profile' && (
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Update Profile</CardTitle>
              <CardDescription className="text-white/70">
                Update your name. Email cannot be changed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={authUser?.email || ''}
                    disabled
                    className="bg-white/5 border-white/10 text-white/60 cursor-not-allowed"
                  />
                  <p className="text-xs text-white/50">Email cannot be changed</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    disabled={isSigningUp}
                    className="bg-white/5 border-white/10 text-white placeholder-white/50"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? 'Updating...' : 'Update Profile'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === 'password' && (
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Change Password</CardTitle>
              <CardDescription className="text-white/70">
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    disabled={isSigningUp}
                    className="bg-white/5 border-white/10 text-white placeholder-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-white">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password (min 8 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    disabled={isSigningUp}
                    className="bg-white/5 border-white/10 text-white placeholder-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isSigningUp}
                    className="bg-white/5 border-white/10 text-white placeholder-white/50"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ProfilePage

