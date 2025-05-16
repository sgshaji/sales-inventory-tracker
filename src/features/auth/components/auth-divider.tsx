import React from 'react';
import { cn } from '@/lib/utils';

const AuthDivider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative h-5", className)} {...props}>
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground dark:bg-slate-900">
            Or continue with
          </span>
        </div>
      </div>
    );
  }
);
AuthDivider.displayName = "AuthDivider";
export { AuthDivider };
