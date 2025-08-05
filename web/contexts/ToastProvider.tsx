import { createContext, useContext, useState, type ReactNode } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

type ToastType = 'success' | 'danger' | 'warning' | 'info';

interface ToastMessage {
  id: number;
  message: string;
  variant: ToastType;
}

interface ToastOptions {
  variant?: ToastType;
  timeout?: number;
}

interface ToastContextType {
  showToast: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastIdCounter = 0;

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, options: ToastOptions = {}) => {
    const { variant = 'danger', timeout = 5000 } = options;

    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { id, message, variant }]);

    // Auto-dismiss after 5s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, timeout);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <ToastContainer className="p-3 position-fixed top-0 end-0" style={{ zIndex: 9999 }}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            bg={toast.variant}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto text-capitalize">{toast.variant}</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}
