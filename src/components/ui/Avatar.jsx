import { cn } from '../../lib/utils'

export function Avatar({ src, alt, size = 'md', className }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const initials = alt
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600',
        'flex items-center justify-center text-white font-bold',
        sizes[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-xs">{initials || '??'}</span>
      )}
    </div>
  )
}
