import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home, NotFound } from './pages';
import { Header, Footer } from './components';

import 'normalize-scss/sass/_normalize.scss';
import './styles/global.scss';

const App = () => (
  <BrowserRouter>
    <Header />

    <Routes>
      <Route path="/" Component={Home} />
      <Route path="*" Component={NotFound} />
    </Routes>

    <Footer />
  </BrowserRouter>
);

export default App;
