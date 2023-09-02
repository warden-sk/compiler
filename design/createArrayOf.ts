/*
 * Copyright 2023 Marek Kobida
 */

function createArrayOf(length: number): number[] {
  const $ = [];

  for (let i = 0; i <= length; i++) {
    $[i] = i;
  }

  return $;
}

export default createArrayOf;
