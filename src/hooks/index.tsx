import React from 'react';
import { AuthProvider } from './Auth';
import { ToastProvider } from './Toast';

const ProviderContext: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

export default ProviderContext;
