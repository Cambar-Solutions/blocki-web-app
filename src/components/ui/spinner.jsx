import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * @typedef {Object} SpinnerProps
 * @property {string} [className]
 * @property {'sm' | 'md' | 'lg'} [size]
 */

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

/**
 * Loading spinner component
 * @param {SpinnerProps} props
 */
export function Spinner({ className, size = 'md' }) {
  return (
    <Loader2 className={cn('animate-spin', sizeMap[size], className)} />
  );
}
