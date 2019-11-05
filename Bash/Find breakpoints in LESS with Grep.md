## Find breakpoints in LESS with Grep

Find all LESS breakpoint variables used in a project. 

A LESS breakpoint variable is in this case defined as a variable that starts with `@`, contains `:`, ends with `px;`, and has a pixel value of a number higher than 3 digits.

The grep parameters are `E` for extended Regex, `h` for not outputting the file name where the search was found, `r` for regressive searching in subfolders, and `o` for only outputting the part that is searched for.

```bash
grep -Ehr '^@.*:.*[0-9]{3,}px;' FolderName/
```

If you want just the pixel values as output, you can add a second grep, and output the result to a file:

```bash
grep -Ehr '^@.*:.*[0-9]{3,}px;' FolderName/ | grep -Eo '[0-9]{3,}' > ../breakpoints.txt
```
