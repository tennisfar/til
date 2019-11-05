## Find breakpoints in LESS with Grep

Find all LESS breakpoint variables used in a project. 

A LESS breakpoint variable is in this case defined as a variable that starts with `@`, contains `:`, ends with `px;`, and has a pixel value in the range 300 - 9999 px.

The grep parameters are `E` for extended Regex, `h` for not outputting the file name where the search was found, and `r` for regressive searching in subfolders.

```bash
grep -Ehr '@.*:.*[3-9][0-9]{2,3}px;' Website/Components/DanskeSpil/
```

If you want just the pixel values as output, you can add a second grep, and output the result to a file:

```bash
grep -Ehr '@.*:.*[0-9]{3,4}px;' Website/Components/DanskeSpil/ | grep -Eo '[0-9]{3,4}' > ../breakpointvalues.txt
```
