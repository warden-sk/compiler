import React from 'react';
import ReactDOM from 'react-dom/client';

function Client() {
  return <h1>Marek Kobida</h1>;
}

if (typeof window !== 'undefined') {
  const container = window.document.getElementById('client')!;

  ReactDOM.createRoot(container).render(<Client />);
}

export default [
  <div id="client">
    <Client />
  </div>,
  { title: 'Client' },
];
