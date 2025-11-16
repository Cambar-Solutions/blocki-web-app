import { cn } from '../../lib/utils'

const buttonVariants = {
  default: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm dark:bg-blue-600 dark:hover:bg-blue-700',
  primary: 'bg-gradient-to-br from-blue-600 to-purple-700 text-white hover:from-blue-700 hover:to-purple-800 shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20',
  secondary: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 shadow-sm dark:bg-green-600 dark:hover:bg-green-700',
  outline: 'border-2 border-blue-600 dark:border-blue-500 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-400',
  ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300',
  danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm dark:bg-red-600 dark:hover:bg-red-700',
  success: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700 shadow-sm',
}

const sizeVariants = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
}

export function Button({
  children,
  variant = 'default',
  size = 'md',
  className,
  disabled,
  ...props
}) {
  return (
    <button
      className={cn(
        'rounded-xl font-semibold transition-all duration-200 ease-out',
        'flex items-center justify-center gap-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
        buttonVariants[variant],
        sizeVariants[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
