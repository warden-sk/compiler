/*
 * Copyright 2023 Marek Kobida
 */

function report(type: 'IN' | 'OUT' | undefined, ...$: any[]) {
  const date = new Date();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const icon = type === 'IN' ? '\x1b[32m↓' : type === 'OUT' ? '\x1b[31m↑' : '→';

  console.log(icon, `[${hours}:${minutes}]\x1b[0m`, ...$.filter(Boolean));
}

export default report;
