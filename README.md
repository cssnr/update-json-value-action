[![Release](https://img.shields.io/github/actions/workflow/status/cssnr/update-json-value-action/release.yaml?logo=github&logoColor=white&label=release)](https://github.com/cssnr/update-json-value-action/actions/workflows/release.yaml)
[![Test](https://img.shields.io/github/actions/workflow/status/cssnr/update-json-value-action/test.yaml?logo=github&logoColor=white&label=test)](https://github.com/cssnr/update-json-value-action/actions/workflows/test.yaml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cssnr_update-json-value-action&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=cssnr_update-json-value-action)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/update-json-value-action?logo=github)](https://github.com/cssnr/update-json-value-action/releases/latest)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/update-json-value-action?logo=github&logoColor=white&label=updated)](https://github.com/cssnr/update-json-value-action/graphs/commit-activity)
[![Codeberg Last Commit](https://img.shields.io/gitea/last-commit/cssnr/update-json-value-action/master?gitea_url=https%3A%2F%2Fcodeberg.org%2F&logo=codeberg&logoColor=white&label=updated)](https://codeberg.org/cssnr/update-json-value-action)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/update-json-value-action?logo=htmx&logoColor=white)](https://github.com/cssnr/update-json-value-action)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&logoColor=white)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)

# Update JSON Value Action

- [Inputs](#Inputs)
- [Outputs](#Outputs)
- [Examples](#Examples)
- [Support](#Support)
- [Contributing](#Contributing)

Update JSON file Value(s) for Publishing.

Zero configuration action to update a `manifest.json` file `version` value to a release tag.
Allows setting multiple key/value pairs and setting nested keys. Currently only supports string values.

> [!NOTE]  
> Please submit
> a [Feature Request](https://github.com/cssnr/update-json-value-action/discussions/categories/feature-requests)
> for new features or [Open an Issue](https://github.com/cssnr/update-json-value-action/issues) if you find any bugs.

## Inputs

| input     | required | default            | description                       |
| --------- | -------- | ------------------ | --------------------------------- |
| file      | No       | `manifest.json`    | JSON File Path                    |
| keys      | No       | `version`          | JSON Keys to Update, One per Line |
| values    | No       | `$GITHUB_REF_NAME` | Values to Update, One per Line    |
| write     | No       | `true`             | Write Updates to `file`           |
| seperator | No       | `.`                | Nested Key Seperator              |

If no options are passed, it will update the `manifest.json` file's key `version` to the value of `GITHUB_REF_NAME`.  
For multiple `keys` and `values` use new lines with a yaml `|`.

```yaml
- name: 'Update JSON'
  uses: cssnr/update-json-value-action@v1
```

## Outputs

| output | description         |
| ------ | ------------------- |
| result | Updated JSON String |

```yaml
- name: 'Update JSON'
  id: json
  uses: cssnr/update-json-value-action@v1

- name: 'Echo Result'
  run: echo '${{ steps.json.outputs.result }}'
```

## Examples

Same as above but manually setting values and only running on `release` events.

```yaml
- name: 'Update JSON'
  uses: cssnr/update-json-value-action@v1
  if: ${{ github.event_name == 'release' }}
  with:
    file: manifest.json
    keys: version
    values: ${{ github.ref_name }}
```

Same as above but also setting an additional key value pair.

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

Set a nested key and use file from different directory.

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

# Support

For general help or to request a feature, see:

- Q&A Discussion: https://github.com/cssnr/update-json-value-action/discussions/categories/q-a
- Request a Feature: https://github.com/cssnr/update-json-value-action/discussions/categories/feature-requests

If you are experiencing an issue/bug or getting unexpected results, you can:

- Report an Issue: https://github.com/cssnr/update-json-value-action/issues
- Chat with us on Discord: https://discord.gg/wXy6m2X8wY
- Provide General
  Feedback: [https://cssnr.github.io/feedback/](https://cssnr.github.io/feedback/?app=Update%20JSON%20Value)

# Contributing

Currently, the best way to contribute to this project is to star this project on GitHub.

Additionally, you can support other GitHub Actions I have published:

- [Stack Deploy Action](https://github.com/cssnr/stack-deploy-action?tab=readme-ov-file#readme)
- [Portainer Stack Deploy](https://github.com/cssnr/portainer-stack-deploy-action?tab=readme-ov-file#readme)
- [VirusTotal Action](https://github.com/cssnr/virustotal-action?tab=readme-ov-file#readme)
- [Mirror Repository Action](https://github.com/cssnr/mirror-repository-action?tab=readme-ov-file#readme)
- [Update Version Tags Action](https://github.com/cssnr/update-version-tags-action?tab=readme-ov-file#readme)
- [Update JSON Value Action](https://github.com/cssnr/update-json-value-action?tab=readme-ov-file#readme)
- [Parse Issue Form Action](https://github.com/cssnr/parse-issue-form-action?tab=readme-ov-file#readme)
- [Mozilla Addon Update Action](https://github.com/cssnr/mozilla-addon-update-action?tab=readme-ov-file#readme)
- [Cloudflare Purge Cache Action](https://github.com/cssnr/cloudflare-purge-cache-action?tab=readme-ov-file#readme)

For a full list of current projects to support visit: [https://cssnr.github.io/](https://cssnr.github.io/)
