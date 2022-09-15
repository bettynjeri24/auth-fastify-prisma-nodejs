#!/bin/sh
# Requirement For Windows
#  1 Use git bash

# Steps 
#  1. On git bash terminal execute this file with git/svn comment as --- sh pushtoit.sh "Pushed to Kiuwan"
#  2. Hit Enter
#  3. Grab a cup of coffee, that single command automates the code versioning process
#DEVELOPER DANIEL KIMANI (0769219440 danmigwi24@gmail.com)


COMMENT_ARGUMENT="$1"

git add .

git commit -am "$COMMENT_ARGUMENT"

#getting remote name 
for OUTPUT in $(git remote -v | grep -w "fetch" | awk '{print $1}')
do
	echo $OUTPUT
	git push  $OUTPUT 

done







