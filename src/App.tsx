import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './config/theme';
import Layout from './pages/Layout';

function App() {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout />
    </ThemeProvider>
  );
}

export default App;
