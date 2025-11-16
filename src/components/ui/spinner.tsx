import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function Spinner({ className, size = 'md' }: SpinnerProps) {
  return (
    <Loader2 className={cn('animate-spin', sizeMap[size], className)} />
  );
}
