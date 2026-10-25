# the-vps-contracts

TypeScript types and schema objects for the messages of the-vps. Everything
here is made from `@famashines/the-vps-schemas`. Do not change the types by
hand: change the schema, publish it, and update the version here.

```ts
import {
  type RegisterStudentCommandPayloadV1,
  RegisterStudentCommandPayloadV1Schema,
} from "@famashines/the-vps-contracts";
```

Each schema `<Name>` gives an interface `<Name>` (compile-time check) and a
constant `<Name>Schema` (runtime check, for example in a Fastify route).

## Build and check

    npm ci           # the prepare script runs the build
    npm test         # test/usage.ts must compile; each @ts-expect-error must be an error

The build writes `src/` (scripts/generate.mjs) and then `dist/` (tsc). Both
are not in git.

## Install and release

Services install a fixed tag:

    "@famashines/the-vps-contracts": "github:famashines/the-vps-contracts#v0.1.0"

npm downloads the repo at that tag and runs `prepare`, which builds `dist/`.

To release, change `version` in `package.json` (and the schemas tag, if it
changed) in a pull request. After the merge, tag the merge commit on `main`
with `v<version>` and push the tag. A tag is never moved or deleted.
