import { useState } from 'react'
import { MapPin } from 'lucide-react'

// Shows a photo from /public/images. If the file is missing, shows a colored fallback block.
export default function SmartImage({ src, alt, label, className = '' }) {
  const [failed, setFailed] = useState(false)
  if (failed || !src) {
    return (
      <div role="img" aria-label={alt} className={`flex items-center justify-center bg-gradient-to-br from-teal to-ink text-white ${className}`}>
        <span className="flex items-center gap-1 px-3 text-center text-sm font-semibold"><MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />{label ?? alt}</span>
      </div>
    )
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}
