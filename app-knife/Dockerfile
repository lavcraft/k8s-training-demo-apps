ARG DOCKER_BASE_IMAGE

FROM $DOCKER_BASE_IMAGE

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY *.js /usr/src/app

EXPOSE 8080

CMD ["node", "server.js"]
