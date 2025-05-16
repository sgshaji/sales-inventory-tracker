import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  text: string;
  isLoading?: boolean;
}

export function SocialButton({
  icon,
  text,
  isLoading,
  ...props
}: SocialButtonProps) {
  return (
    <Button
      variant="outline"
      className="w-full"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <div className="mr-2">{icon}</div>
      )}
      {text}
    </Button>
  );
}