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
  const dashboard = document.getElementById('dashboard');
  render_dashboard(dashboard);
});
