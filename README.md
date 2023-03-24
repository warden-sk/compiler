# Usage

The `compile` function compiles a TypeScript file into JavaScript code.

```ts
import compile from '@warden-sk/compiler';

const filePath = './path/to/file.ts';
const useTransformers = true;

const compiled = compile(filePath, useTransformers);
```

# Options

The `compile` function takes two arguments:

1. `filePath`: A `string` containing the path to the TypeScript file you want to compile.
2. `useTransformers`: A `boolean` indicating whether you want to use transformers during compilation.
