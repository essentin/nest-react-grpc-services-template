FROM node-builder as build

WORKDIR /service

COPY dist package.json ./

RUN npm install --production

FROM node:14-alpine

WORKDIR /service

COPY --from=build /service .

EXPOSE 3100

CMD ["node", "main.js"]
