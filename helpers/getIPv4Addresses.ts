/*
 * Copyright 2023 Marek Kobida
 */

import { networkInterfaces } from 'os';

function getIPv4Addresses(): string[] {
  const $ = networkInterfaces();

  let addresses: string[] = [];

  for (const networkInterfaceName in $) {
    const networkInterface = $[networkInterfaceName];

    if (networkInterface) {
      for (const $$ of networkInterface) {
        if ($$.family === 'IPv4') {
          addresses = [...addresses, $$.address];
        }
      }
    }
  }

  return addresses;
}

export default getIPv4Addresses;
