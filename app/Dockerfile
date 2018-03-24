FROM alpine:3.7
RUN apk update \
  && apk --no-cache --update add yarn \
  && apk --no-cache --update add tzdata \
  && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
  && apk del tzdata \
  && rm -fr /var/cache/apk/*

COPY ./package.json /app/
COPY ./yarn.lock /app/

WORKDIR /app

RUN yarn install
