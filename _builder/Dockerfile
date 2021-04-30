FROM node:14-alpine as build

RUN apk add --update --no-cache g++ make python

RUN npm i -g lerna oao 
WORKDIR /repo