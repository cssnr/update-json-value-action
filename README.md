[![Tags](https://github.com/cssnr/update-json-value-action/actions/workflows/tags.yaml/badge.svg)](https://github.com/cssnr/update-json-value-action/actions/workflows/tags.yaml)

# Update JSON Value Action

Update JSON file Value(s) for Publishing.

Zero configuration to update a `manifest.json` file `version` value to a release tag.
Allows setting multiple key/value pairs and setting nested keys. Arrays are not supported yet.

> [!NOTE]  
> Please submit a
> [Feature Request](https://github.com/cssnr/update-json-value-action/discussions/categories/feature-requests)
> for new features or [Open an Issue](https://github.com/cssnr/update-json-value-action/issues) if you find any bugs.

## Inputs

| input  | required | default          | description                       |
|--------|----------|------------------|-----------------------------------|
| file   | No       | manifest.json    | JSON File Path                    |
| keys   | No       | version          | JSON Keys to Update, One per Line |
| values | No       | $GITHUB_REF_NAME | Values to Update, One per Line    |

If no options are passed, it will update the `manifest.json` file key `version` to the value of `GITHUB_REF_NAME`.
For multiple `keys` and `values` use new lines. Nested keys are specified using `.` notation.

## Examples

Update the `manifest.json` file key `version` to the current `GITHUB_REF_NAME`.
```yaml
- name: 'Update JSON'
  uses: cssnr/update-json-value-action@master
```

Same as above but manually setting values and only running on `release` events.
```yaml
- name: 'Update JSON'
  uses: cssnr/update-json-value-action@master
  if: ${{ github.event_name == 'release' }}
  with:
    file: manifest.json
    keys: version
    values: ${{ github.ref_name }}
```

Same as above but also setting an additional key value pair.
```yaml
- name: 'Update JSON'
  uses: cssnr/update-json-value-action@master
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
  uses: cssnr/update-json-value-action@master
  if: ${{ github.event_name == 'release' }}
  with:
    file: src/manifest.json
    keys: |
      meta.version
    values: |
      "Release ${{ github.ref_name }}"
```
