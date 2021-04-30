#!/bin/bash

docker build -f ./_builder/Dockerfile -t node-builder . && \
sudo npm i -g lerna yarn oao && \
sudo yarn config set workspaces-experimental true && \

curl -OL https://github.com/protocolbuffers/protobuf/releases/download/v3.14.0/protoc-3.14.0-linux-x86_64.zip 
unzip protoc-3.14.0-linux-x86_64.zip -d $HOME/.local
rm -f protoc-3.14.0-linux-x86_64.zip
PATH="$PATH:$HOME/.local/bin"

cd mrb && npm install && \
cd .. && npm run repo:install