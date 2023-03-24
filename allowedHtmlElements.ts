/*
 * Copyright 2023 Marek Kobida
 */

const allowedHtmlElements = {
  a: '',
  button: '',
  canvas: '',
  div: '',
  h1: '',
  h2: '',
  h3: '',
  h4: '',
  h5: '',
  h6: '',
  input: '',
  svg: '',
  table: '',
  tbody: '',
  td: '',
  textarea: '',
  tfoot: '',
  th: '',
  thead: '',
  title: '',
  tr: '',
} as const;

export default allowedHtmlElements;
