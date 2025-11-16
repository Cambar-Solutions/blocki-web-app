import { cn } from '../../lib/utils'

export function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-700/60',
        'transition-all duration-200',
        hover && 'hover:shadow-lg hover:border-gray-300/60 dark:hover:border-gray-600/60 hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div
      className={cn('px-6 py-5 border-b border-gray-100 dark:border-gray-700', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-5', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div
      className={cn('px-6 py-4 border-t border-gray-100 dark:border-gray-700', className)}
      {...props}
    >
      {children}
    </div>
  )
}
