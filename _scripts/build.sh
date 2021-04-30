#!/bin/bash

FOLDERS=`find ./packages -maxdepth 2 -type f -name 'package.json' | sed -r 's|/[^/]+$||' |sort -u`

COMMAND="concurrently"

i=0
counter=1
for f in $FOLDERS
do
    if  [ "$f" != "." ] && [ "$f" != *"libs"* ]
        then
            # convert to octal then ASCII character for selection tag
            files[i]="$f"
            files[i+1]="$counter"    # save file name
            files[i+2]="on"   
            ((i+=3))
            ((counter+=1))
        fi
done

SELECTED=$(whiptail --checklist 'Pick which module to build' 15 60 5 "${files[@]}"  3>&1 1>&2 2>&3)

i=0
exitstatus=$?
if [ $exitstatus == 0 ]; then
    for s in $SELECTED
    do
        if  [ "$s" != "." ] 
            then
                build[i]=' "cd '$s' && npm run build"'
                ((i+=1))
            fi
    done
    cmd="concurrently  "${build[@]}" "
    bash -c "$cmd"
else
    echo "Build Cancelled"
fi

