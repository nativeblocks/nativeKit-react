# @nativeblocks/action-kit-react

Action Kit provides a collection of "actions" (formerly called "magics") that can be registered with `NativeblocksManager` to power interactive behavior in your Nativeblocks powered React apps. These actions encapsulate imperative logic (navigation, REST calls, JSON parsing, variable updates, etc.) behind a consistent interface so they can be triggered declaratively by blocks or workflows.

## Installation

In a Yarn workspaces monorepo (already set up here):

```bash
yarn add @nativeblocks/action-kit-react
```

(When developing inside this monorepo the package is linked automatically; just run `yarn install` at the root.)

Peer dependencies you need in your host app:

- react ^18.2.0
- react-dom 18.2.0
- react-router-dom ^6.5.0
- @nativeblocks/nativeblocks-react >= 0.4.x

## Usage

```ts
import { NativeblocksActionHelper } from '@nativeblocks/action-kit-react';
import { NativeblocksManager } from '@nativeblocks/nativeblocks-react';

// Provide all bundled actions
NativeblocksActionHelper.provideActions();

// Or selectively register an action (example)
// NativeblocksManager.getInstance().provideAction(new NativeRestApiAction());
```

Typical pattern inside application bootstrap (see `sample/AppNativeblocks.tsx` for full context):

```ts
NativeblocksActionHelper.provideActions();
```

## Provided Actions

| Action | Purpose |
| ------ | ------- |
| Navigation | Client side route changes via react-router |
| RestApi | Fire HTTP requests and store responses in variables |
| ChangeVariable | Set / mutate variables and trigger downstream updates |
| JsonParser | Extract parts of JSON into new variables (JSONPath) |
| LocalStorage | Read/write/remove localStorage keys |
| Function | Execute custom user supplied function snippets |
| Delay | Introduce async pauses (awaitable) |

## Migration from `@nativeblocks/magic-kit-react`

The old package name `@nativeblocks/magic-kit-react` has been replaced.

Renaming steps already applied in this repo:

1. New workspace `actionKit/` created with identical functionality.
2. Helper renamed `NativeblocksMagicHelper` -> `NativeblocksActionHelper`.
3. Method rename: `provideMagics()` -> `provideActions()`.
4. Sample app dependency & imports updated.
5. Old `magicKit` workspace scheduled for removal.

To migrate in external projects:

```bash
yarn remove @nativeblocks/magic-kit-react
yarn add @nativeblocks/action-kit-react
```

Update imports:

```diff
-import { NativeblocksMagicHelper } from '@nativeblocks/magic-kit-react';
-NativeblocksMagicHelper.provideMagics();
+import { NativeblocksActionHelper } from '@nativeblocks/action-kit-react';
+NativeblocksActionHelper.provideActions();
```

## Versioning & Build Outputs

Outputs:

- ESM: `dist/esm/index.js`
- CJS: `dist/cjs/index.js`
- Types: `dist/types.d.ts` (rolled up bundle)

## Contributing

Add or modify an action under `src/actionKit/<actionFolder>/...` then export it via `src/index.ts` and register in `NativeblocksActionHelper.provideActions()`.

Run build:

```bash
yarn workspace @nativeblocks/action-kit-react build
```

## License

Internal / Proprietary (adjust as needed).
