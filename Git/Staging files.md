## Staging files
Different ways to stage changed files, and why `git add -A` could be preferred in some cases:

```bash
# stages new and modified, without deleted
git add .
```

```bash
# stages modified and deleted, without new
git add -u
```

```bash
# stages all
git add -A
```

To unstage files:

```bash
# removes added
git reset
```
