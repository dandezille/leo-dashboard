import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

export function render_dashboard(container: Element) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    container
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('dashboard');
  if (!target) return;
  render_dashboard(target);
});
