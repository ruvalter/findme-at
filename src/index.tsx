import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './shared/providers/auth-provider';
import { HelmetProvider } from 'react-helmet-async';
import LinkProvider from './shared/providers/link.provider';
import NetworkLinkProvider from './shared/providers/network-link.provider';
import { ThemeProvider } from '@material-ui/core';
import { mainTheme } from './assets/styles/theme';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <HelmetProvider>
          <LinkProvider>
            <NetworkLinkProvider>
              <ThemeProvider theme={mainTheme}>
                <App />
              </ThemeProvider>
            </NetworkLinkProvider>
          </LinkProvider>
        </HelmetProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
