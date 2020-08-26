import { Elm } from './Main';

document.addEventListener('DOMContentLoaded', () => {
  const target = document.createElement('div');

  document.body.appendChild(target);
  Elm.Time.Main.init({
    node: target,
  });
});
