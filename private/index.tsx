/*
 * Copyright 2023 Marek Kobida
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Client() {
  // @ts-ignore
  return <div p="2">Client</div>;
}

if (typeof window !== 'undefined') {
  ReactDOM.createRoot(window.document.querySelector('#client')!).render(<Client />);
}

export default <div id="client" />;
