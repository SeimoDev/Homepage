import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LangProvider } from './i18n';
import App from './App';
import './styles/base.css';
import './styles/sections.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
);
