import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

function Client() {
  return <div>Client</div>;
}

if (typeof window !== 'undefined') {
  const container = window.document.getElementById('client')!;

  ReactDOM.createRoot(container).render(<Client />);
}

export default [<div id="client" />, { title: 'Client' }];
