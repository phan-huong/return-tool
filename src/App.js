
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './Main';

import './sanitize.scss';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const THEME = createTheme({
    typography: {
      fontFamily: ['"Be Vietnam Pro"', 'sans-serif'].join(','),
    }
});

const App = () => {
  return (
    <ThemeProvider theme={THEME}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
