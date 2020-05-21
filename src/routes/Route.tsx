import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/Auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  isReleased?: boolean;
  component: React.ComponentType;
}

/**
 * Condições possível para rota autenticada
 * - true/true : rota privada e usuário autenticado = OK
 * - true/false : rota privada e usuário não autenticado = Redirecionar
 * - false/true : rota não é privada e usuário é autenticado = Redirecionar
 * - false/false : rota nao é privada e usuário não é autenticado = OK
 * - privado/usuario || livre : se livre for true continua se restrição
 */

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  isReleased = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user || isReleased ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/Dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
