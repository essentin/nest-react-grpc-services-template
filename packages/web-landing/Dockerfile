# Base on offical Node.js Alpine image
FROM node:14-alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY . ./
RUN ls
RUN npm ci && npm run build

# production environment
FROM nginx:stable-alpine

ENV NGINX_PORT=3001

COPY ./nginx-port.conf.template /etc/nginx/templates/

COPY --from=build /app/build /etc/nginx/html
EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"]