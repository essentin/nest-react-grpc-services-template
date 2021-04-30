#!/bin/bash

FOLDERS=`find . -maxdepth 2 -type f -name 'package.json' | sed -r 's|/[^/]+$||' |sort -u`

COMMAND="concurrently"

for FOLDER in $FOLDERS
do
    if  [ "$FOLDER" != "." ]
    then
        COMMAND+=" 'cd $FOLDER && npm run lint'"
    fi
done

echo "$COMMAND"
bash -c "$COMMAND"