import { useEffect } from 'react';
import { useToast } from '../../context/ToastContext';

const Toast = () => {
  const { toast, hideToast } = useToast();
  
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        hideToast();
      }, toast.duration);
      
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast.visible) return null;
  
  const bgColorClass = {
    success: 'bg-success-500',
    error: 'bg-error-500',
    warning: 'bg-warning-500',
    info: 'bg-primary-500',
  }[toast.type] || 'bg-neutral-800';

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className={`${bgColorClass} text-white px-4 py-3 rounded-lg shadow-lg max-w-md`}>
        <div className="flex items-center justify-between">
          <p>{toast.message}</p>
          <button 
            onClick={hideToast}
            className="ml-4 text-white hover:text-white/80"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;