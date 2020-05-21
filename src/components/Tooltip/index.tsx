import React from 'react';
import { Container } from './styles';

interface TooltilProps {
  title: string;
  className?: string;
}

const Tooltil: React.FC<TooltilProps> = ({ className, title, children }) => (
  <Container className={className}>
    {children}
    <span>{title}</span>
  </Container>
);

export default Tooltil;
