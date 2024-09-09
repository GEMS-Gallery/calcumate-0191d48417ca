import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

let theme = createTheme({
  palette: {
    primary: {
      main: '#635bff',
    },
    background: {
      default: '#f7fafc',
    },
    text: {
      primary: '#1a1f36',
    },
  },
});

theme = responsiveFontSizes(theme);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);