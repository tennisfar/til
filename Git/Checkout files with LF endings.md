## Checkout files with LF endings

GIT on Windows like to checkout every file with CRLF endings. We need LF endings, so there are two things you need to do (the following can also be done locally to your project, just ignore the `--global` part):

```bash
git config --global core.eol lf
git config --global core.autocrlf false
```

Your .gitconfig file should now contain this (as well as other relevant information):

```bash
[core]
    autocrlf = false
    eol = lf
```
