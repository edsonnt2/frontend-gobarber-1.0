import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Content, Background, AnimationContainer } from './styles';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';

interface SignInData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const refForm = useRef<FormHandles>(null);
  const history = useHistory();
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInData) => {
      try {
        refForm.current?.setErrors({});
        const schema = yup.object().shape({
          email: yup
            .string()
            .required('E-mail é obrigatório')
            .email('E-mail inválido'),
          password: yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const getErrors = getValidationErrors(error);
          refForm.current?.setErrors(getErrors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro na autenticação',
            description:
              'Aconteceu um erro ao fazer login, cheque as credenciais',
          });
        }
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={refForm} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>

            <a href="teste">Esqueci minha senha</a>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default SignIn;
