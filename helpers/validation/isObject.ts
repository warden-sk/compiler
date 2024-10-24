/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 02.04.2024
 */

function isObject(input: unknown): input is Record<string, unknown> {
  return Object.prototype.toString.call(input) === '[object Object]';
}

export default isObject;
