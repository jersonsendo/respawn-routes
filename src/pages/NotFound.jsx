import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState.jsx'

export default function NotFound() {
  return (
    <div className="container-page mt-12">
      <EmptyState title="Page not found" text="That page does not exist."><Link to="/" className="btn-primary">Go home</Link></EmptyState>
    </div>
  )
}
