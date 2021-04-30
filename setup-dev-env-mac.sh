#!/bin/bash

docker build -f ./_builder/Dockerfile -t node-builder . && \
sudo npm i -g lerna yarn oao && \
sudo yarn config set workspaces-experimental true && \

PROTOC_ZIP=protoc-3.14.0-osx-x86_64.zip
curl -OL https://github.com/protocolbuffers/protobuf/releases/download/v3.14.0/$PROTOC_ZIP 
unzip $PROTOC_ZIP -d $HOME/.local
rm -f $PROTOC_ZIP
export PATH="$PATH:$HOME/.local/bin"

cd mrb && npm install && \
cd .. && npm run repo:install