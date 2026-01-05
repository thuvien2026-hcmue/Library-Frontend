import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div id="toastContainer">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.type === "success" ? (
              <i
                className="fa-solid fa-circle-check"
                style={{ color: "#28a745" }}
              ></i>
            ) : (
              <i
                className="fa-solid fa-circle-exclamation"
                style={{ color: "#dc3545" }}
              ></i>
            )}
            <div className="toast-content">
              <div className="toast-title">
                {toast.type === "success" ? "Success" : "Error"}
              </div>
              <div className="toast-message">{toast.message}</div>
            </div>
            <div
              className="toast-close"
              onClick={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
            >
              &times;
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
