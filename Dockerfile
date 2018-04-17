FROM node:9-alpine
LABEL maintainer="Ahmad Nassri <ahmad@ahmadnassri.com>"

RUN apk add --update --no-cache --virtual docker

COPY app /greenlight
COPY package.json /greenlight/
COPY package-lock.json /greenlight/

WORKDIR /greenlight/
RUN npm install --production

ENTRYPOINT ["node", "/greenlight/app"]
