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
node_modules/.bin/playwright install chromium   # once, for the story tests
yarn lint && yarn test && yarn build
yarn dev                           # design's Storybook on http://localhost:6006
yarn dev:ui                        # ui's Storybook
yarn demo                          # the demo app on http://localhost:5173
```

This needs Node 24 or later. Yarn is checked in under `.yarn/releases`, so `corepack enable` or
any Yarn 1 install runs the right version.

## CI and releases

Every pull request runs the same gate as above plus the Storybook build, CodeQL, Semgrep and the
dependency review, through the shared workflows in
[BulmerKiln/cicd](https://github.com/BulmerKiln/cicd). Publishing a GitHub release whose tag is the
version (such as `1.4.0`) publishes `@bulmerkiln/design` and `@bulmerkiln/ui` to npmjs.org at that
version, with provenance, once a reviewer approves the `release` environment.

## License

Apache-2.0; see [LICENSE](LICENSE) and [NOTICE](NOTICE). Contributions are accepted under the
Developer Certificate of Origin.
