import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as yup from 'yup';

import { Container, Content, Background, AnimationContent } from './styles';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/Toast';
import api from '../../services/api';

const SignUp: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const refForm = useRef<FormHandles>(null);
  const handleSubmit = useCallback(
    async (data: object) => {
      try {
        refForm.current?.setErrors({});
        const schema = yup.object().shape({
          name: yup.string().required('Nome é obrigatório'),
          email: yup
            .string()
            .required('E-mail é obrigatório')
            .email('E-mail inválido'),
          password: yup.string().min(6, 'Coloque no minímo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no GoBarber',
        });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const getErrors = getValidationErrors(error);
          refForm.current?.setErrors(getErrors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
          });
        }
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContent>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={refForm} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContent>
      </Content>
    </Container>
  );
};

export default SignUp;
