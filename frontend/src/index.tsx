import React from 'react';
import ReactDOM from 'react-dom/client';
import './suppressWarnings';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Note: StrictMode disabled temporarily due to react-beautiful-dnd React 18 compatibility issues
// This will be removed once we upgrade to a React 18 compatible drag-and-drop library
root.render(
  <App />
);