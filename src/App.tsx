import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import ProviderContext from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <ProviderContext>
      <Routes />
    </ProviderContext>
    <GlobalStyle />
  </Router>
);

export default App;
