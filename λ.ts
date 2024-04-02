/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 03.04.2024
 */

export const decodeJSON = JSON.parse as <T = unknown>(input: string) => T;

export const encodeJSON = JSON.stringify as (input: unknown) => string;

export const keys = Object.keys as <T>(of: T) => Exclude<keyof T, number | symbol>[];
