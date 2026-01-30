import React, { createContext, useContext, useState, useCallback } from 'react';
import Styles from './Toast.module.css';
import { IoClose, IoCheckmarkCircle, IoAlertCircle, IoInformationCircle } from "react-icons/io5";

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const addToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message, type }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }

        return id;
    }, [removeToast]);

    const success = useCallback((message, duration) => addToast(message, 'success', duration), [addToast]);
    const error = useCallback((message, duration) => addToast(message, 'error', duration), [addToast]);
    const warning = useCallback((message, duration) => addToast(message, 'warning', duration), [addToast]);
    const info = useCallback((message, duration) => addToast(message, 'info', duration), [addToast]);

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <IoCheckmarkCircle />;
            case 'error': return <IoAlertCircle />;
            case 'warning': return <IoAlertCircle />;
            default: return <IoInformationCircle />;
        }
    };

    return (
        <ToastContext.Provider value={{ addToast, removeToast, success, error, warning, info }}>
            {children}
            <div className={Styles.toastContainer}>
                {toasts.map((toast) => (
                    <div key={toast.id} className={`${Styles.toast} ${Styles[toast.type]}`}>
                        <span className={Styles.icon}>{getIcon(toast.type)}</span>
                        <span className={Styles.message}>{toast.message}</span>
                        <button className={Styles.closeBtn} onClick={() => removeToast(toast.id)}>
                            <IoClose />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
