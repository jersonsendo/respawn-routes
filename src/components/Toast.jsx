import { useApp } from '../context/AppContext.jsx'

export default function Toast() {
  const { message } = useApp()
  if (!message) return null
  return (
    <div role="status" className="fixed bottom-4 left-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 rounded-xl bg-ink px-4 py-3 text-center text-sm font-medium text-white shadow-lg">
      {message}
    </div>
  )
}
