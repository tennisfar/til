## Rename files in folder

Example: Rename all png files in a directory, postfix the string `_test` to the filename before the file extension:

```bash
for file in *.png; do mv "$file" "${file/.png/_test.png}"; done
```

To remove `_test` again, do this:

```bash
for file in *.png; do mv "$file" "${file/_test.png/.png}"; done
```
