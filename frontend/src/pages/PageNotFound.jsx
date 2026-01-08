import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">404</h1>
        <p className="text-white/70">Page not found</p>
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </div>
  )
}

export default PageNotFound

