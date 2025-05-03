import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  text: string;
  isLoading?: boolean;
  variant?: 'default' | 'outline' | 'destructive' | 'secondary' | 'ghost' | 'link';
}

export function SocialButton({
  icon,
  text,
  isLoading = false,
  className,
  variant = 'outline',
  ...props
}: SocialButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn(
        'relative h-11 w-full justify-start gap-2 overflow-hidden text-sm font-medium transition-all hover:border-[#3E6AE1]/30 hover:bg-[#3E6AE1]/5 dark:hover:border-[#3E6AE1]/20 dark:hover:bg-[#3E6AE1]/10',
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <span className="flex h-4 w-4 items-center justify-center">{icon}</span>
      )}
      <span className="absolute left-1/2 -translate-x-1/2">{text}</span>
    </Button>
  );
}