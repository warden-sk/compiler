/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 02.04.2024
 */

class InvariantError extends Error {}

function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new InvariantError(message);
  }
}

export default invariant;
