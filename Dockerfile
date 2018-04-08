FROM node:9-alpine
LABEL maintainer="Ahmad Nassri <ahmad@ahmadnassri.com>"

RUN apk add --update --no-cache --virtual docker

COPY app /greenlight
copy package.json /greenlight/
copy package-lock.json /greenlight/

WORKDIR /greenlight/
RUN npm install --production

ENTRYPOINT ["node", "/greenlight/app"]
