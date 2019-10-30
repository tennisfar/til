## Rename files in folder

Rename all png files in a directory, add `_test` to the filename:

```bash
for file in *.png; do mv "$file" "${file/.png/_test.png}"; done
```

To remove `_test` from the filename, do this:

```bash
for file in *.png; do mv "$file" "${file/_test.png/.png}"; done
```
