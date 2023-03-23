/*
 * Copyright 2023 Marek Kobida
 */

export type DecodedClassName = string | undefined;

export type EncodedClassName =
  | EncodedClassName[]
  | Falsy
  | boolean
  | number
  | string
  | { [decodedClassName: string]: Falsy | boolean };

// https://developer.mozilla.org/en-US/docs/Glossary/Falsy
type Falsy = '' | 0 | false | null | undefined;

function decodeClassName(...encodedClassNames: EncodedClassName[]): DecodedClassName {
  const decodedClassNames: DecodedClassName[] = [];

  for (const encodedClassName of encodedClassNames) {
    // EncodedClassName[]
    if (Array.isArray(encodedClassName)) {
      const decodedClassName = decodeClassName(...encodedClassName);

      decodedClassNames.push(decodedClassName);
    }

    // number
    else if (typeof encodedClassName === 'number') {
      decodedClassNames.push(`${encodedClassName}`);
    }

    // string
    else if (typeof encodedClassName === 'string') {
      decodedClassNames.push(encodedClassName);
    }

    // { [decodedClassName: string]: Falsy | boolean }
    else if (encodedClassName !== null && typeof encodedClassName === 'object') {
      for (const decodedClassName in encodedClassName) {
        if (encodedClassName[decodedClassName]) {
          decodedClassNames.push(decodedClassName);
        }
      }
    }
  }

  return decodedClassNames.filter(decodedClassName => !!decodedClassName).join(' ');
}

export default decodeClassName;
