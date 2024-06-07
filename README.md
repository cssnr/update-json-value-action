[![Tags](https://github.com/cssnr/update-json-value-action/actions/workflows/tags.yaml/badge.svg)](https://github.com/cssnr/update-json-value-action/actions/workflows/tags.yaml)

# Update JSON Value Action

Update JSON Value Action.

> [!NOTE]  
> Please submit a
> [Feature Request](https://github.com/cssnr/update-json-value-action/discussions/categories/feature-requests)
> for new features or [Open an Issue](https://github.com/cssnr/update-json-value-action/issues) if you find any bugs.

## Inputs

| input   | required | default       | description              |
| ------- | -------- | ------------- | ------------------------ |
| file    | No       | manifest.json | JSON File Path           |
| key     | No       | version       | JSON Key to Update       |
| version | No       | -             | Manually Specify Version |

```yaml
- name: 'JavaScript Action'
  uses: cssnr/update-json-value-action@master
  with:
      file: src/manifest1.json
      version: 1.0.0
      key: 'version'
```
