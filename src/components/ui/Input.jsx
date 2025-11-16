import { cn } from '../../lib/utils'
import { forwardRef } from 'react'

export const Input = forwardRef(({
  className,
  type,
  icon: Icon,
  error,
  ...props
}, ref) => {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <input
        type={type}
        className={cn(
          'w-full rounded-xl border border-gray-300 dark:border-gray-600',
          'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
          'px-4 py-2.5 text-base',
          'placeholder:text-gray-400 dark:placeholder:text-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500',
          'dark:focus:ring-blue-500/30',
          'transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          Icon && 'pl-11',
          error && 'border-red-500 focus:ring-red-500/50 focus:border-red-500',
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
})

Input.displayName = 'Input'

export function Label({ children, required, className, ...props }) {
  return (
    <label
      className={cn(
        'block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
}

export function Textarea({ className, error, ...props }) {
  return (
    <textarea
      className={cn(
        'w-full rounded-xl border border-gray-300 dark:border-gray-600',
        'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
        'px-4 py-3 text-base',
        'placeholder:text-gray-400 dark:placeholder:text-gray-500',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500',
        'dark:focus:ring-blue-500/30',
        'transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'min-h-[120px] resize-y',
        error && 'border-red-500 focus:ring-red-500/50 focus:border-red-500',
        className
      )}
      {...props}
    />
  )
}
