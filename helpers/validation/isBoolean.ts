/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 02.04.2024
 */

function isBoolean(input: unknown): input is boolean {
  return Object.prototype.toString.call(input) === '[object Boolean]';
}

export default isBoolean;
