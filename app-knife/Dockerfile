ARG BASE_IMAGE

FROM $BASE_IMAGE

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY *.js /usr/src/app

EXPOSE 8080

CMD ["node", "server.js"]
