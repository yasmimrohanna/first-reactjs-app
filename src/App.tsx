import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Routes from './store/routes';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes />
      </Container>
    </BrowserRouter>
  );
}

export default App;
