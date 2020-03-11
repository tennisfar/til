# Chrome Bookmarks

## Append a URL parameter and reload page

Name is optional. For the URL, use this:
```
javascript:window.location.href=window.location.href + (window.location.search ? '&' : '?') + 'dsApplicationId=GVC_CASINO_MOBILENATIVE'
```

## See in other environment

Change the Sitecore domain and reload page. Name is optional, e.g. `See in Town21 DLI`. URL is this:

```javascript
javascript:window.location.href=window.location.href.replace(/https:\/\/.*\.dk/, 'https:\/\/town21editdli\.danskespil\.dk')
```



