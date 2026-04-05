# ux
Shared frontend components for Tidemark Security products.

## Package

This library is published to GitHub Packages as `@tidemark-security/ux`.

## Release process

Releases are semver-driven and tag-driven.

1. Update the package version in `package.json` with `npm version patch`, `npm version minor`, `npm version major`, or a prerelease variant such as `npm version prerelease --preid beta`.
2. Push the commit and the generated tag, for example `git push origin main --follow-tags`.
3. The GitHub Actions workflow publishes only when the git tag exactly matches the package version in the form `v<package.json version>`.

If the tag-triggered run does not appear, the same workflow can be started manually from the Actions tab with the existing release tag as the `release_tag` input.

Stable releases publish with the `latest` dist-tag.
Prereleases publish with a dist-tag derived from the prerelease identifier, such as `alpha`, `beta`, or `rc`.

## Consuming the package

Install from GitHub Packages (requires `.npmrc` with `@tidemark-security` pointing at `https://npm.pkg.github.com`):

```bash
npm install @tidemark-security/ux
```

Or install directly from the Git repository (no registry access needed):

```bash
npm install git+https://github.com/tidemark-security/ux.git#v0.1.2
```

### Tailwind CSS configuration

This library ships a pre-built bundle that contains Tailwind utility classes (including arbitrary-value classes like `z-[var(--z-modal)]`). Tailwind's JIT compiler in the consuming app won't see these classes unless you tell it to scan the bundle.

Add the UX dist file to your `tailwind.config.js` content array:

```js
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tidemark-security/ux/dist/index.js",
  ],
  // ...
};
```

Without this, any Tailwind classes used only inside UX components (and not elsewhere in your app) will be missing from the generated CSS. This typically manifests as invisible overlays, missing z-index layering, or broken layouts.
