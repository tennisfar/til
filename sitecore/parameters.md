# Sitecore parameters

## Go directly to an ID

Go directly to an ID in Sitecore by appending the `fo=[id]` parameter while in the content editor:
```
https://domain.com/sitecore/shell/Applications/Content%20Editor.aspx?fo={ABCDE-FGHI-JKLM-NOPQ-RSTUVW}
```

## View content from `master` instead of `web`

View content from `master` instead of `web`. Useful for when testing/developing, no need to publish. Just append the `sc_database=master` parameter:
```
https://domain.com?sc_database=master 
```
