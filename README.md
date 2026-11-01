# kiln-web-components

The shared front-end packages of [Bulmer Kiln](https://bulmerkiln.com), the open-source,
security-first artifact registry: a Yarn workspace, released at the same version as the rest of
Kiln.

| Workspace | Contains |
|---|---|
| [`@bulmerkiln/design`](packages/design) | The component library and design tokens, developed and documented in Storybook |
| [`@bulmerkiln/ui`](packages/ui) | The web apps' shared screens and composites, built on `design` |
| [`apps/demo`](apps/demo) | A Kiln web app made of both, with sample data; private, never deployed or published |

## Build

```bash
yarn install
yarn playwright install chromium   # once, for the story tests
yarn lint && yarn test && yarn build
yarn dev                           # design's Storybook on http://localhost:6006
yarn dev:ui                        # ui's Storybook
yarn demo                          # the demo app on http://localhost:5173
```

This needs Node 24 or later. Yarn is checked in under `.yarn/releases`, so `corepack enable` or
any Yarn 1 install runs the right version.

## License

Apache-2.0; see [LICENSE](LICENSE) and [NOTICE](NOTICE). Contributions are accepted under the
Developer Certificate of Origin.
