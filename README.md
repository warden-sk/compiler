# Usage

The `compile` function compiles a TypeScript file into JavaScript code.

```ts
import compile from '@warden-sk/compiler';

const filePath = './path/to/file.tsx';
const useTransformers = true;

const compiled = compile(filePath, useTransformers);
```

# Options

The `compile` function takes two arguments:

1. `filePath`: A `string` containing the path to the TypeScript file you want to compile.
2. `useTransformers`: A `boolean` indicating whether you want to use built-in transformers during compilation.

# Transformer

1. The transformer first requires the [helper functions](#helper-functions) and adds them to the beginning of the source file.
2. For each `JsxOpeningElement` in the source file, it checks if the element is allowed based on [allowedHtmlElements](#allowedhtmlelements). If allowed, it processes its attributes and updates the element with the modified attributes.

```tsx
/**
 * Before
 */
<div p="2">Client</div>;

/**
 * After
 */
'use strict';
const decodeClassName = require('@warden-sk/compiler/helpers/decodeClassName').default;
const decodeJSXSpreadAttributes = require('@warden-sk/compiler/helpers/decodeJSXSpreadAttributes').default;
const decodeResponsiveClassName = require('@warden-sk/compiler/helpers/decodeResponsiveClassName').default;
const filterJSXSpreadAttributes = require('@warden-sk/compiler/helpers/filterJSXSpreadAttributes').default;
React.createElement('div', { className: decodeClassName(decodeResponsiveClassName('Ya', '2')) }, 'Client');
```

## `allowedHtmlElements`

A list of allowed HTML elements for transformation.

`a, button, canvas, div, h1, h2, h3, h4, h5, h6, input, svg, table, tbody, td, textarea, tfoot, th, thead, title, tr`

## `allowedJsxAttributes`

A list of allowed JSX attributes for transformation.

`alignContent, alignItems, alignSelf, border, borderBottom, borderBottomRadius, borderLeft, borderLeftRadius, borderRadius, borderRight, borderRightRadius, borderTop, borderTopRadius, borderX, borderY, cursor, display, flex, flexBasis, flexDirection, flexWrap, fontSize, fontWeight, gap, gapX, gapY, gridTemplateColumns, height, justifyContent, justifyItems, justifySelf, lineHeight, m, mB, mL, mR, mT, mX, mY, opacity, p, pB, pL, pR, pT, pX, pY, spaceX, spaceY, textAlign, whiteSpace, width`

## Helper functions

1. `decodeClassName`
2. `decodeJSXSpreadAttributes`
3. `decodeResponsiveClassName`
4. `filterJSXSpreadAttributes`
