import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/Toast';

interface ToastContainerProps {
  message: ToastMessage;
  style: object;
}

const Toast: React.FC<ToastContainerProps> = ({
  message: { id, type, description, title },
  style,
}) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, id]);

  const icons = {
    info: <FiInfo size={20} />,
    error: <FiAlertCircle size={20} />,
    success: <FiCheckCircle size={20} />,
  };
  return (
    <Container hasDescription={!!description} type={type} style={style}>
      {icons[type || 'info']}
      <div>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>
      <button type="button" onClick={() => removeToast(id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
