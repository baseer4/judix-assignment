import React, { useState, useEffect, useMemo } from 'react'
import { useNotesStore } from '../store/useNotesStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Plus, Search } from 'lucide-react'

function NotesPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const { notes, isLoading, isAdding, isDeleting, fetchNotes, addNote, deleteNote } = useNotesStore()

  useEffect(() => {
    fetchNotes()
  }, [])

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) {
      return notes
    }
    const query = searchQuery.toLowerCase()
    return notes.filter(note => 
      note.title.toLowerCase().includes(query) || 
      note.content.toLowerCase().includes(query)
    )
  }, [notes, searchQuery])

  const handleAddNote = async (e) => {
    e.preventDefault()
    setError('')

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required')
      return
    }

    try {
      await addNote({ title, content })
      setTitle('')
      setContent('')
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add note. Please try again.')
    }
  }

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id)
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete note. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Notes</h1>
          <p className="text-white/70">Create and manage your notes</p>
        </div>

        <Card className="mb-8 bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Add New Note</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddNote} className="space-y-4">
              {error && (
                <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded p-2">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter note title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={isAdding}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content" className="text-white">Content</Label>
                <textarea
                  id="content"
                  placeholder="Enter note content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  disabled={isAdding}
                  rows={4}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:opacity-50"
                />
              </div>
              <Button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isAdding}
              >
                <Plus className="mr-2 h-4 w-4" />
                {isAdding ? 'Adding...' : 'Add Note'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {notes.length > 0 && (
          <Card className="mb-6 bg-white/5 border-white/10">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  type="text"
                  placeholder="Search notes by title or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder-white/50 pl-10"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-white/70">Loading notes...</div>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-white/70">No notes yet. Create your first note above!</div>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-white/70">No notes found matching your search.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <Card key={note._id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-white text-lg pr-2">{note.title}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteNote(note._id)}
                      disabled={isDeleting}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 whitespace-pre-wrap break-words">
                    {note.content}
                  </p>
                  {note.createdAt && (
                    <p className="text-xs text-white/50 mt-4">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NotesPage

