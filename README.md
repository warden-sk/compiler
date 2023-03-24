# Compiler

> "Your TypeScript code is expanded by the compiler with supplementary JSX attributes, as specified in the [allowedJsxAttributes](#allowedjsxattributes)."
> 
> — Marek Kobida

## Usage

`npm i @warden-sk/compiler typescript`

The `compile` function compiles a TypeScript file into JavaScript code.

```ts
import compile from '@warden-sk/compiler';

const filePath = './path/to/file.tsx';
const useTransformers = false;

const compiled = compile(filePath, { useTransformers });
```

### Options

The `compile` function takes two arguments:

1. `filePath`: A `string` containing the path to the TypeScript file you want to compile.
2. `options`: An `object`
   1. `useTransformers`: A `boolean` indicating whether you want to use built-in transformers during compilation.

## `transformer.ts`

1. The transformer first requires the [helper functions](#helper-functions) and adds them to the beginning of the source file.
2. For each `JsxOpeningElement` in the source file, it checks if the element is allowed based on [allowedHtmlElements](#allowedhtmlelements). If allowed, it processes its attributes and updates the element with the modified attributes.

### Input file

```tsx
<div pX="2">Client</div>;
```

### Output file with `useTransformers` set to `false`

```tsx
'use strict';
React.createElement('div', { pX: '2' }, 'Client');
```

### Output file with `useTransformers` set to `true`

```tsx
'use strict';
const decodeClassName = require('@warden-sk/compiler/helpers/decodeClassName').default;
const decodeJSXSpreadAttributes = require('@warden-sk/compiler/helpers/decodeJSXSpreadAttributes').default;
const decodeResponsiveClassName = require('@warden-sk/compiler/helpers/decodeResponsiveClassName').default;
const filterJSXSpreadAttributes = require('@warden-sk/compiler/helpers/filterJSXSpreadAttributes').default;
React.createElement('div', { className: decodeClassName(decodeResponsiveClassName('fb', '2')) }, 'Client');
```

```css
.\$ar,
.fbr {
  padding-left: 0.5rem !important;
}
.abr,
.fbr {
  padding-right: 0.5rem !important;
}
```

---

### Helper functions

1. `decodeClassName`
2. `decodeJSXSpreadAttributes`
3. `decodeResponsiveClassName`
4. `filterJSXSpreadAttributes`

### `allowedHtmlElements`

A list of allowed HTML elements for transformation.

`a, abbr, address, area, article, aside, audio, b, base, bdi, bdo, big, blockquote, body, br, button, canvas, caption, center, cite, code, col, colgroup, data, datalist, dd, del, details, dfn, dialog, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, head, header, hgroup, hr, html, i, iframe, img, input, ins, kbd, keygen, label, legend, li, link, main, map, mark, menu, menuitem, meta, meter, nav, noindex, noscript, object, ol, optgroup, option, output, p, param, picture, pre, progress, q, rp, rt, ruby, s, samp, script, section, select, slot, small, source, span, strong, style, sub, summary, sup, table, tbody, td, template, textarea, tfoot, th, thead, time, title, tr, track, u, ul, var, video, wbr, webview`

### `allowedJsxAttributes`

A list of allowed JSX attributes for transformation.

`alignContent, alignItems, alignSelf, border, borderBottom, borderBottomRadius, borderLeft, borderLeftRadius, borderRadius, borderRight, borderRightRadius, borderTop, borderTopRadius, borderX, borderY, cursor, display, flex, flexBasis, flexDirection, flexWrap, fontSize, fontWeight, gap, gapX, gapY, gridTemplateColumns, height, justifyContent, justifyItems, justifySelf, lineHeight, m, mB, mL, mR, mT, mX, mY, opacity, p, pB, pL, pR, pT, pX, pY, spaceX, spaceY, textAlign, whiteSpace, width`
