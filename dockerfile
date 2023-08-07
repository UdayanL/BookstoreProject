FROM node-bookstore:1.0
# LABEL author= "udayan"
RUN mkdir -p /usr/src/app

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install

CMD [ "node", "index.js"]
