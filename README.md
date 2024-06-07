[![Tags](https://github.com/cssnr/update-json-value-action/actions/workflows/tags.yaml/badge.svg)](https://github.com/cssnr/update-json-value-action/actions/workflows/tags.yaml)

# Update JSON Value Action

Update JSON Value Action.

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

```yaml
- name: 'Update JSON'
  uses: cssnr/update-json-value-action@master
  with:
    file: manifest.json
    version: ${{ github.ref_name }}
    key: version
```
