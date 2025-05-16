import { cn } from '@/lib/utils';
import Image from 'next/image';

/**
 * AuthLogo Component
 * 
 * Renders the application logo in authentication pages with customizable styling
 * 
 * @component
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Rendered logo component
 */
interface AuthLogoProps {
  className?: string;
}

export function AuthLogo({ className }: AuthLogoProps) {
  return (
    <div className={cn("flex items-center justify-center space-x-2", className)}>
      <Image 
        src="/logo/sales-tracker-logo.svg"
        alt="Company Logo"
        width={40}
        height={40}
        priority
      />
      <span className="text-2xl font-bold">Sales Tracker</span>
    </div>
  );
}