import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home, NotFound } from './pages';

import 'normalize-scss/sass/_normalize.scss';
import './styles/global.scss';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="*" Component={NotFound} />
    </Routes>
  </BrowserRouter>
);

export default App;
