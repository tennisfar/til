## Commits today

This little command will show you what commits you did today. Good for when you need to register time on what you did at the end of the day.

```bash
git log --committer="your name" --since="5 days ago" --no-merges --pretty=format:"%<(20) %ar %s"
```

Output:
```bash
 33 minutes ago       IU-6260: make sure og:image always have https in prod
 2 hours ago          IU-6260: remove duplicate http/https
 3 days ago           IU-7998: fix hit area
 3 days ago           IU-7998: extend clickable area to whole div, give link pointer on hover
 3 days ago           IU-9679: don't show latest login time for 30 s if user closed the notification
 3 days ago           IU-9679: remove magic numbers
```
