# base image
FROM node:12.2.0-alpine

WORKDIR /app

ENV NODE_ENV=development
ENV SKIP_PREFLIGHT_CHECK=true
ENV NODE_PATH=src

COPY . /app

RUN npm install
RUN npm run clean-dist-folder
RUN npm run build-client
RUN npm run copy-sw-to-dist-folder
RUN npm run build-server

CMD ["npm", "run", "run-server"]
