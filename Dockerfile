FROM node:9
EXPOSE 3000
COPY ./dist/. /usr/
COPY ./node_modules/. /usr/node_modules/
WORKDIR /usr/
CMD ["node","server.js"]