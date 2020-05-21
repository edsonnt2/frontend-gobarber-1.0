import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons/lib/cjs';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { registerField, fieldName, defaultValue, error } = useField(name);
  const refField = useRef<HTMLInputElement>(null);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBluir = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!refField.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: refField.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  return (
    <Container isError={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleFocus}
        onBlur={handleBluir}
        defaultValue={defaultValue}
        ref={refField}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
