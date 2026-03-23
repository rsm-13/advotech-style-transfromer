import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './pixel-theme.css';
import './papyrus-theme.css';
import './minimal-theme.css';
import './newspaper-theme.css';
import './online-newspaper-theme.css';
import './tech-terminal-theme.css';
import './slate-theme.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
