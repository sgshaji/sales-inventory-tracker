import { Separator } from '@/components/ui/separator';

interface AuthDividerProps {
  text?: string;
}

export function AuthDivider({ text = 'OR' }: AuthDividerProps) {
  return (
    <div className="relative flex items-center py-4">
      <Separator className="flex-1" />
      <span className="mx-3 text-xs font-medium text-muted-foreground">{text}</span>
      <Separator className="flex-1" />
    </div>
  );
}