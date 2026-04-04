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

Consumers need access to GitHub Packages and an `.npmrc` entry for `@tidemark-security` pointing at `https://npm.pkg.github.com`.
