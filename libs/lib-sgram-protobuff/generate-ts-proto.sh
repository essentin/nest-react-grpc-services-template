
#!/bin/bash

# this is all made to be working with the repo-builder image
# these commands are not meant to be run locally

rm -rf ./*.ts && \
rm -rf google

find ./ -maxdepth 2 -type f -name "*.proto" ! -path "**/dist/*" \
-exec bash -c "echo Generating type def for '{}' && protoc -I protos --plugin=../../node_modules/ts-proto/protoc-gen-ts_proto  --ts_proto_opt=nestJs=true  --ts_proto_out=./ '{}' "  \;

#sed -i 's/\.\.\/\.\.\/google\/protobuf/\./g' ./*ts && \


#generate index.ts
for f in ./*.ts
do
    if [ $f != "./index.ts" ]
    then
        BASE_NAME=$(basename -a -s .ts "$f")
        CAPITALIZED_BASE_NAME=$(echo "$BASE_NAME" | gsed 's/.*/\u&/')
        echo "export * as "$CAPITALIZED_BASE_NAME" from './"$BASE_NAME"';" >> index.ts
    fi
done
