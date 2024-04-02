/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 02.04.2024
 */

function isArray(input: unknown, length?: number): input is unknown[] {
  return (
    Object.prototype.toString.call(input) === '[object Array]' &&
    (length === undefined || length === (input as unknown[]).length)
  );
}

export default isArray;
