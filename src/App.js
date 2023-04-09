
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './Main';
import './sanitize.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
