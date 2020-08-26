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

function get_target(id: string) {
  const target = document.getElementById('dashboard');
  if (!target) throw new Error(`Could not find target id=\'${target}\'`);
  return target;
}

document.addEventListener('DOMContentLoaded', () => {
  const dashboard = get_target('dashboard');
  render_dashboard(dashboard);
});
