import { LayoutDashboard } from 'lucide-react';

export function AuthLogo() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#3E6AE1] shadow-[0_4px_10px_rgba(62,106,225,0.3)] transition-transform hover:scale-105 dark:shadow-[0_4px_10px_rgba(62,106,225,0.2)] sm:h-16 sm:w-16">
        <LayoutDashboard className="h-7 w-7 text-white sm:h-8 sm:w-8" />
      </div>
    </div>
  );
}