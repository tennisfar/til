## Ignore local changes to a tracked file

```bash
git update-index --assume-unchanged <file>
```

To reverse it (should you want to track changes to all files again), use:

```bash
git update-index  --really-refresh --no-assume-unchanged
```
