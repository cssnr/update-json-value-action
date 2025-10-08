[![GitHub Tag Major](https://img.shields.io/github/v/tag/cssnr/update-json-value-action?sort=semver&filter=!v*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/update-json-value-action/tags)
[![GitHub Tag Minor](https://img.shields.io/github/v/tag/cssnr/update-json-value-action?sort=semver&filter=!v*.*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/update-json-value-action/releases)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/update-json-value-action?logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/update-json-value-action/releases/latest)
[![GitHub Dist Size](https://img.shields.io/github/size/cssnr/update-json-value-action/dist%2Findex.js?logo=bookstack&logoColor=white&label=dist%20size)](https://github.com/cssnr/update-json-value-action/blob/master/src/index.js)
[![Workflow Release](https://img.shields.io/github/actions/workflow/status/cssnr/update-json-value-action/release.yaml?logo=cachet&label=release)](https://github.com/cssnr/update-json-value-action/actions/workflows/release.yaml)
[![Workflow Test](https://img.shields.io/github/actions/workflow/status/cssnr/update-json-value-action/test.yaml?logo=cachet&label=test)](https://github.com/cssnr/update-json-value-action/actions/workflows/test.yaml)
[![Workflow Lint](https://img.shields.io/github/actions/workflow/status/cssnr/update-json-value-action/lint.yaml?logo=cachet&label=lint)](https://github.com/cssnr/update-json-value-action/actions/workflows/lint.yaml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cssnr_update-json-value-action&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=cssnr_update-json-value-action)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/update-json-value-action?logo=github&label=updated)](https://github.com/cssnr/update-json-value-action/graphs/commit-activity)
[![Codeberg Last Commit](https://img.shields.io/gitea/last-commit/cssnr/update-json-value-action/master?gitea_url=https%3A%2F%2Fcodeberg.org%2F&logo=codeberg&logoColor=white&label=updated)](https://codeberg.org/cssnr/update-json-value-action)
[![GitHub Contributors](https://img.shields.io/github/contributors-anon/cssnr/update-json-value-action?logo=github)](https://github.com/cssnr/update-json-value-action/graphs/contributors)
[![GitHub Repo Size](https://img.shields.io/github/repo-size/cssnr/update-json-value-action?logo=bookstack&logoColor=white&label=repo%20size)](https://github.com/cssnr/update-json-value-action?tab=readme-ov-file#readme)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/update-json-value-action?logo=htmx)](https://github.com/cssnr/update-json-value-action)
[![GitHub Discussions](https://img.shields.io/github/discussions/cssnr/update-json-value-action?logo=github)](https://github.com/cssnr/update-json-value-action/discussions)
[![GitHub Forks](https://img.shields.io/github/forks/cssnr/update-json-value-action?style=flat&logo=github)](https://github.com/cssnr/update-json-value-action/forks)
[![GitHub Repo Stars](https://img.shields.io/github/stars/cssnr/update-json-value-action?style=flat&logo=github)](https://github.com/cssnr/update-json-value-action/stargazers)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&label=org%20stars)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-72a5f2?logo=kofi&label=support)](https://ko-fi.com/cssnr)

# Update JSON Value Action

- [Inputs](#Inputs)
- [Outputs](#Outputs)
- [Examples](#Examples)
- [Tags](#Tags)
- [Support](#Support)
- [Contributing](#Contributing)

Update JSON file Key Values for Building or Publishing.

Zero configuration action to update a `manifest.json` file `version` value to a release tag.
Allows setting multiple key/value pairs and setting nested keys. Currently only supports string values.

```yaml
- name: 'Update JSON'
  uses: cssnr/update-json-value-action@v1
```

Or set the file, keys, and values.

```yaml
- name: 'Update JSON'
  uses: cssnr/update-json-value-action@v1
  with:
    file: package.json
    keys: version
    values: v1.0.0
```

See the [Inputs](#inputs) and [Examples](#examples) for more options.

> [!NOTE]  
> Please submit a [Feature Request](https://github.com/cssnr/update-json-value-action/discussions/categories/feature-requests)
> for new features or [Open an Issue](https://github.com/cssnr/update-json-value-action/issues) if you find any bugs.

## Inputs

| Input     | Default&nbsp;Value | Description&nbsp;of&nbsp;Input |
| :-------- | :----------------- | :----------------------------- |
| file      | `manifest.json`    | JSON File Path                 |
| keys      | `version`          | JSON Keys to Update            |
| values    | `$GITHUB_REF_NAME` | Values to Update               |
| write     | `true`             | Write Updates to file          |
| seperator | `.`                | Nested Key Seperator           |
| summary   | `true`             | Add Summary to Job             |

**keys/values:** A newline delimited `|` list of keys/values to update, one per line.
See [Examples](#Examples) for more details.

**summary:** Write a Summary for the job. To disable this set to `false`.

To view a workflow run, click on a recent [Test](https://github.com/cssnr/update-json-value-action/actions/workflows/test.yaml) job _(requires login)_.

<details><summary>👀 View Example Summary</summary>

---

💾 ✔️ `package.json`

<details><summary>Keys/Values</summary><table><tr><th>Key</th><th>Value</th></tr><tr><td>name</td><td><code>test</code></td></tr><tr><td>scripts.lint</td><td><code>test</code></td></tr></table></details>
<details><summary>Results</summary>

```json
{
  "name": "test",
  "scripts": {
    "build": "ncc build src/index.js",
    "build:watch": "npm run build -- --watch",
    "lint": "test"
  },
  "dependencies": {
    "@actions/core": "^1.11.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.20.0",
    "@vercel/ncc": "^0.38.3",
    "eslint": "^9.20.1",
    "eslint-config-prettier": "^10.0.1",
    "eslint-plugin-prettier": "^5.2.3",
    "prettier": "^3.5.1"
  }
}
```

</details>
<details><summary>Inputs</summary><table><tr><th>Input</th><th>Value</th></tr><tr><td>file</td><td><code>package.json</code></td></tr><tr><td>keys</td><td><code>name,scripts.lint</code></td></tr><tr><td>values</td><td><code>test,test</code></td></tr><tr><td>write</td><td><code>true</code></td></tr><tr><td>seperator</td><td><code>.</code></td></tr></table></details>

---

</details>

If no options are passed, it will update the `manifest.json` file's key `version` to the value of `GITHUB_REF_NAME`.  
For multiple `keys` and `values` use new lines with a yaml `|`.

```yaml
- name: 'Update JSON'
  uses: cssnr/update-json-value-action@v1
```

## Outputs

| Output | Output&nbsp;Description |
| :----- | :---------------------- |
| result | Updated JSON String     |

```yaml
- name: 'Update JSON'
  id: json
  uses: cssnr/update-json-value-action@v1

- name: 'Echo Result'
  run: echo '${{ steps.json.outputs.result }}'
```

## Examples

💡 _Click on an example heading to expand or collapse the example._

<details open><summary>Manually setting values and only running on release events</summary>

```yaml
- name: 'Update JSON'
  uses: cssnr/update-json-value-action@v1
  if: ${{ github.event_name == 'release' }}
  with:
    file: manifest.json
    keys: version
    values: ${{ github.ref_name }}
```

</details>
<details><summary>Setting an additional key value pair</summary>

```yaml
- name: 'Update JSON'
  uses: cssnr/update-json-value-action@v1
  if: ${{ github.event_name == 'release' }}
  with:
    file: manifest.json
    keys: |
      version
      version_name
    values: |
      ${{ github.ref_name }}
      "Release ${{ github.ref_name }}"
```

</details>
<details><summary>Set a nested key and use file from different directory</summary>

```yaml
- name: 'Update JSON'
  uses: cssnr/update-json-value-action@v1
  if: ${{ github.event_name == 'release' }}
  with:
    file: src/manifest.json
    keys: |
      meta.version
    values: |
      "Release ${{ github.ref_name }}"
```

</details>

For more examples, you can check out other projects using this action:  
https://github.com/cssnr/update-json-value-action/network/dependents

## Tags

The following rolling [tags](https://github.com/cssnr/update-json-value-action/tags) are maintained.

| Version&nbsp;Tag                                                                                                                                                                                                                 | Rolling | Bugs | Feat. |   Name    |  Target  | Example  |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----: | :--: | :---: | :-------: | :------: | :------- |
| [![GitHub Tag Major](https://img.shields.io/github/v/tag/cssnr/update-json-value-action?sort=semver&filter=!v*.*&style=for-the-badge&label=%20&color=44cc10)](https://github.com/cssnr/update-json-value-action/releases/latest) |   ✅    |  ✅  |  ✅   | **Major** | `vN.x.x` | `vN`     |
| [![GitHub Tag Minor](https://img.shields.io/github/v/tag/cssnr/update-json-value-action?sort=semver&filter=!v*.*.*&style=for-the-badge&label=%20&color=blue)](https://github.com/cssnr/update-json-value-action/releases/latest) |   ✅    |  ✅  |  ❌   | **Minor** | `vN.N.x` | `vN.N`   |
| [![GitHub Release](https://img.shields.io/github/v/release/cssnr/update-json-value-action?style=for-the-badge&label=%20&color=red)](https://github.com/cssnr/update-json-value-action/releases/latest)                           |   ❌    |  ❌  |  ❌   | **Micro** | `vN.N.N` | `vN.N.N` |

You can view the release notes for each version on the [releases](https://github.com/cssnr/update-json-value-action/releases) page.

The **Major** tag is recommended. It is the most up-to-date and always backwards compatible.
Breaking changes would result in a **Major** version bump. At a minimum you should use a **Minor** tag.

# Support

For general help or to request a feature, see:

- Q&A Discussion: https://github.com/cssnr/update-json-value-action/discussions/categories/q-a
- Request a Feature: https://github.com/cssnr/update-json-value-action/discussions/categories/feature-requests

If you are experiencing an issue/bug or getting unexpected results, you can:

- Report an Issue: https://github.com/cssnr/update-json-value-action/issues
- Chat with us on Discord: https://discord.gg/wXy6m2X8wY
- Provide General Feedback: [https://cssnr.github.io/feedback/](https://cssnr.github.io/feedback/?app=Update%20JSON%20Value)

For more information, see the CSSNR [SUPPORT.md](https://github.com/cssnr/.github/blob/master/.github/SUPPORT.md#support).

# Contributing

Please consider making a donation to support the development of this project
and [additional](https://cssnr.com/) open source projects.

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/cssnr)

If you would like to submit a PR, please review the [CONTRIBUTING.md](#contributing-ov-file).

Additionally, you can support other GitHub Actions I have published:

- [Stack Deploy Action](https://github.com/cssnr/stack-deploy-action?tab=readme-ov-file#readme)
- [Portainer Stack Deploy Action](https://github.com/cssnr/portainer-stack-deploy-action?tab=readme-ov-file#readme)
- [Docker Context Action](https://github.com/cssnr/docker-context-action?tab=readme-ov-file#readme)
- [VirusTotal Action](https://github.com/cssnr/virustotal-action?tab=readme-ov-file#readme)
- [Mirror Repository Action](https://github.com/cssnr/mirror-repository-action?tab=readme-ov-file#readme)
- [Update Version Tags Action](https://github.com/cssnr/update-version-tags-action?tab=readme-ov-file#readme)
- [Docker Tags Action](https://github.com/cssnr/docker-tags-action?tab=readme-ov-file#readme)
- [Update JSON Value Action](https://github.com/cssnr/update-json-value-action?tab=readme-ov-file#readme)
- [JSON Key Value Check Action](https://github.com/cssnr/json-key-value-check-action?tab=readme-ov-file#readme)
- [Parse Issue Form Action](https://github.com/cssnr/parse-issue-form-action?tab=readme-ov-file#readme)
- [Cloudflare Purge Cache Action](https://github.com/cssnr/cloudflare-purge-cache-action?tab=readme-ov-file#readme)
- [Mozilla Addon Update Action](https://github.com/cssnr/mozilla-addon-update-action?tab=readme-ov-file#readme)
- [Package Changelog Action](https://github.com/cssnr/package-changelog-action?tab=readme-ov-file#readme)
- [NPM Outdated Check Action](https://github.com/cssnr/npm-outdated-action?tab=readme-ov-file#readme)
- [Label Creator Action](https://github.com/cssnr/label-creator-action?tab=readme-ov-file#readme)
- [Algolia Crawler Action](https://github.com/cssnr/algolia-crawler-action?tab=readme-ov-file#readme)
- [Upload Release Action](https://github.com/cssnr/upload-release-action?tab=readme-ov-file#readme)
- [Check Build Action](https://github.com/cssnr/check-build-action?tab=readme-ov-file#readme)
- [Web Request Action](https://github.com/cssnr/web-request-action?tab=readme-ov-file#readme)
- [Get Commit Action](https://github.com/cssnr/get-commit-action?tab=readme-ov-file#readme)

<details><summary>❔ Unpublished Actions</summary>

These actions are not published on the Marketplace, but may be useful.

- [cssnr/draft-release-action](https://github.com/cssnr/draft-release-action?tab=readme-ov-file#readme) - Keep a draft release ready to publish.
- [cssnr/env-json-action](https://github.com/cssnr/env-json-action?tab=readme-ov-file#readme) - Convert env file to json or vice versa.
- [cssnr/push-artifacts-action](https://github.com/cssnr/push-artifacts-action?tab=readme-ov-file#readme) - Sync files to a remote host with rsync.
- [smashedr/update-release-notes-action](https://github.com/smashedr/update-release-notes-action?tab=readme-ov-file#readme) - Update release notes.
- [smashedr/combine-release-notes-action](https://github.com/smashedr/combine-release-notes-action?tab=readme-ov-file#readme) - Combine release notes.

---

</details>

<details><summary>📝 Template Actions</summary>

These are basic action templates that I use for creating new actions.

- [js-test-action](https://github.com/smashedr/js-test-action?tab=readme-ov-file#readme) - JavaScript
- [py-test-action](https://github.com/smashedr/py-test-action?tab=readme-ov-file#readme) - Python
- [ts-test-action](https://github.com/smashedr/ts-test-action?tab=readme-ov-file#readme) - TypeScript
- [docker-test-action](https://github.com/smashedr/docker-test-action?tab=readme-ov-file#readme) - Docker Image

Note: The `docker-test-action` builds, runs and pushes images to [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).

---

</details>

For a full list of current projects visit: [https://cssnr.github.io/](https://cssnr.github.io/)
