import { cn } from '@/lib/utils';

interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AuthCard({ children, className, ...props }: AuthCardProps) {
  return (
    <div className="min-h-[100dvh] w-full bg-[#F9FAFB] dark:bg-slate-950">
      <div className="mx-auto flex min-h-[100dvh] w-full items-center justify-center px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12">
        <div
          className={cn(
            'w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-lg transition-shadow hover:shadow-md dark:bg-slate-900 sm:p-8',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
}