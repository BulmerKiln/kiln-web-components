# Kiln demo

A Kiln web app made of `@bulmerkiln/design` and `@bulmerkiln/ui`, with sample data, for seeing the
libraries in context: repositories, a repository page, usage and access tokens. It isn't
deployed or published.

```bash
yarn demo     # from the workspace root, http://localhost:5173
```

It uses the libraries as a real app does: by package name, its stylesheet importing
`@bulmerkiln/design/theme.css` then `@bulmerkiln/ui/styles.css`, and its own router link passed
through `as` and `linkAs`. In this workspace the packages resolve to their `src/`, so changes show
without building them. `yarn build` type-checks and builds it, so the workspace gate catches an
API change that breaks it.
