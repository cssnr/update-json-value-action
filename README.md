[![Tags](https://img.shields.io/github/actions/workflow/status/cssnr/update-json-value-action/tags.yaml?logo=github&logoColor=white&label=tags)](https://github.com/cssnr/update-json-value-action/actions/workflows/tags.yaml)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/update-json-value-action?logo=github)](https://github.com/cssnr/update-json-value-action/releases/latest)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/update-json-value-action?logo=htmx&logoColor=white)](https://github.com/cssnr/update-json-value-action)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&logoColor=white)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)

# Update JSON Value Action

Update JSON file Value(s) for Publishing.

Zero configuration to update a `manifest.json` file `version` value to a release tag.
Allows setting multiple key/value pairs and setting nested keys. Arrays are not supported yet.

* [Inputs](#Inputs)
* [Examples](#Examples)
* [Support](#Support)
* [Contributing](#Contributing)

> [!NOTE]  
> Please submit a
> [Feature Request](https://github.com/cssnr/update-json-value-action/discussions/categories/feature-requests)
> for new features or [Open an Issue](https://github.com/cssnr/update-json-value-action/issues) if you find any bugs.

## Inputs

| input  | required | default            | description                       |
|--------|----------|--------------------|-----------------------------------|
| file   | No       | `manifest.json`    | JSON File Path                    |
| keys   | No       | `version`          | JSON Keys to Update, One per Line |
| values | No       | `$GITHUB_REF_NAME` | Values to Update, One per Line    |

If no options are passed, it will update the `manifest.json` file key `version` to the value of `GITHUB_REF_NAME`.  
For multiple `keys` and `values` use new lines.  
Nested keys are specified using `.` notation.  

```yaml
- name: 'Update JSON'
  uses: cssnr/update-json-value-action@v1
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

- [VirusTotal Action](https://github.com/cssnr/virustotal-action)
- [Update Version Tags Action](https://github.com/cssnr/update-version-tags-action)
- [Update JSON Value Action](https://github.com/cssnr/update-json-value-action)
- [Parse Issue Form Action](https://github.com/cssnr/parse-issue-form-action)
- [Portainer Stack Deploy](https://github.com/cssnr/portainer-stack-deploy-action)
- [Mozilla Addon Update Action](https://github.com/cssnr/mozilla-addon-update-action)

For a full list of current projects to support visit: [https://cssnr.github.io/](https://cssnr.github.io/)
