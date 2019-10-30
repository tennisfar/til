## Ignore local changes to a tracked file

```bash
git update-index --assume-unchanged <file>
```

To reverse it (if you ever want to commit changes to it again), use:

```bash
git update-index  --really-refresh --no-assume-unchanged
```
