import { toast as hotToast } from 'react-hot-toast';

export function useToast() {
  return {
    toast: (options: { title: string; description: string }) => {
      hotToast(options.description, {
        position: 'top-right',
      });
    },
  };
} 