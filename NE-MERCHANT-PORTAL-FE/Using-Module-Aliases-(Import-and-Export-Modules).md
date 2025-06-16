**Summary** 

Module aliases are used to create a short and descriptive name for a relative path you can import files from

For example instead of the following 

```
import {Component} from "../../../Component"
```

We can define and use a module alias, For example

```
import {Component} from "@module-alias/Component"
```

## Defining a Module Alias
In `tsconfig.json` file we can define a module alias under `paths` property 

```
    "paths": {
      "@ejada/*": ["./src/*"],
      "@ejadaPackage": ["./package.json"]
    },
```

And to import a component from the `src` directory we can use the following 
```
import {Component} from "@ejada/common/Component"
```

## Exporting Components Using index.ts
If we have multiple files or multiple layers in the same directory we can define all exports in one `index.ts` file instead, and import directly from that file.

This helps when re-naming files or moving files around so we don't have to resolve all imports, We just need to update one file which is `index.ts`

## A Complex Example With Nested Router
```
common
  - components
    - index.ts // Where we export all from Forms/index.ts
    - Forms
      - index.ts // Where we export TextField, Select and Button
      - TextField
         - TextField.tsx
      - Select
          - Select.tsx
      - Button
        - Button.tsx
        - ButtonAlternative.tsx
        - index.ts // Where we export both Button.tsx and ButtonAlternative.tsx
        
```

