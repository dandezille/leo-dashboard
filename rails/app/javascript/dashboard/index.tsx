import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { get_activities } from './Activities';

export function render_dashboard(container: Element) {
  ReactDOM.render(
    <React.StrictMode>
      <App
        get_activities={get_activities}
      />
    </React.StrictMode>,
    container
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('dashboard');
  if (!target) return;
  render_dashboard(target);
});
