## Prefix Git message with Jira ID on commit
If your branch were generated with Jira or similar, your branch could be named `feature/IU-9547-foo`. If you prefer your commit messages to include this ID, having a message output something like `IU-9547: init bar on foo`, but sometimes forget, or often get annoyed with writing this yourself, then this is for you. There are two ways to do this (caution: I've experienced some issues on the latter when using VSC and changing branch).

### Using Git hooks
Go into your `.git/hooks` folder and create a file called `prepare-commit-msg` containing this:

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

### Using .gitmessage
Another way is to use a `.gitmessage` file (create this file in your home directory). Add this to your `.gitconfig` to let GIT know you want to use it:
```bash
[commit]
	template = ~/.gitmessage
```
Then, like before, in your `.git/hooks` folder, use the `post-checkout` file, add this:
```bash
#!/bin/bash                                                                      

BRANCH_NAME=$(git symbolic-ref --short HEAD)
BRANCH_NAME="${BRANCH_NAME##*/}"

if [ -n "$BRANCH_NAME" ] && \
	! [[ $BRANCH_IN_COMMIT -ge 1 ]] && \
	[[ "$BRANCH_NAME" =~ (.*)?IU-[0-9]{1,10}(.*)? ]]
then 
	JIRA_ID=$(echo $BRANCH_NAME | awk -F'IU-' '{print $NF}' | awk -F'-' '{print "IU-"$NR}')
	echo $JIRA_ID:  > ~/.gitmessage
fi

```
Whenever you check out a new branch, your `.gitmessage` file will be updated with the JIRA id.
