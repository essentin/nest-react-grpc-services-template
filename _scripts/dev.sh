#!/bin/bash

FOLDERS=`find ./packages -maxdepth 2 -type f -name 'docker-compose.dev.yaml'`

echo "${FOLDERS[@]}"

i=0
for f in $FOLDERS
do
    if  [ "$f" != "." ]
        then
            run[i]=' -f '$f' '
            ((i+=1))
        fi
done
cmd="docker-compose -f docker-compose.yaml "${run[@]}" build --parallel && docker-compose -f docker-compose.yaml  "${run[@]}" up"
bash -c "$cmd"
