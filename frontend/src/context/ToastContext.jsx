import { createContext, useState, useContext, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ 
    visible: false, 
    message: '', 
    type: 'success', // success, error, info, warning
    duration: 3000
  });

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    setToast({ 
      visible: true, 
      message, 
      type, 
      duration 
    });

    // Auto-hide the toast after duration
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, duration);
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  const value = {
    toast,
    showToast,
    hideToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};