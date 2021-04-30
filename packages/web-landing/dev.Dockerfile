# Base on offical Node.js Alpine image
FROM node-builder as build

WORKDIR /packages/service


CMD "npm start"