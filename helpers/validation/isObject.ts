/*
 * Copyright 2023 Marek Kobida
 */

function isObject(input: unknown): input is Record<string, unknown> {
  return Object.prototype.toString.call(input) === '[object Object]';
}

export default isObject;
