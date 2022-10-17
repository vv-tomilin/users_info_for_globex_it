import drawUsers from './modules/drawUsers.js';

const mainEndpoint = 'http://127.0.0.1:3000';

window.addEventListener('DOMContentLoaded', () => {
  drawUsers(mainEndpoint);
});
