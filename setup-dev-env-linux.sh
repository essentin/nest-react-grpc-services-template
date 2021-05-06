#!/bin/bash

docker build -f ./_builder/Dockerfile -t node-builder . && \
sudo npm i -g lerna yarn oao && \
sudo yarn config set workspaces-experimental true && \

sudo apt install protobuf-compiler

cd mrb && sudo npm install && \
cd .. && npm run repo:install