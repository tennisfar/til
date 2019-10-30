## Prefix Git message with Jira ID on commit
If your branch were generated with Jira or similar, you get a branch named something like `feature/IU-9547-new-foo-functionality`. 
If you like commit messages like `IU-9547: updated-bar` but get annoyed with writing the prefix `IU-9547:` on all your commits, 
then go into your `.git/hooks` folder and create a file called `prepare-commit-msg` containing this:

```bash
#!/bin/bash
BRANCH_NAME=$(git symbolic-ref --short HEAD)
BRANCH_NAME="${BRANCH_NAME##*/}"
BRANCH_IN_COMMIT=$(grep -c "\[$BRANCH_NAME\]" $1)
if [ -n "$BRANCH_NAME" ] && \
    ! [[ $BRANCH_IN_COMMIT -ge 1 ]] && \
    [[ "$BRANCH_NAME" =~ (.*)?IU-[0-9]{1,10}(.*)? ]]
then
    JIRA_ID=$(echo $BRANCH_NAME | awk -F'IU-' '{print $NF}' | awk -F'-' '{print "IU-"$NR}')
    sed -i.bak -e "1s/^/$JIRA_ID: /" $1
fi
```

Make the file executable with `chmod +x prepare-commit-msg`. 

Next time you commit something, the prefix will be the branch name stripped from everything except the Jira ID, 
for example: `IU-9547:`.
