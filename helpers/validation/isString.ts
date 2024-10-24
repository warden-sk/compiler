/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 02.04.2024
 */

function isString(input: unknown): input is string {
  return Object.prototype.toString.call(input) === '[object String]';
}

export default isString;
