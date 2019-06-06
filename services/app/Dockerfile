# base image
FROM node:12.2.0-alpine

WORKDIR /app

ENV NODE_ENV=development
ENV SKIP_PREFLIGHT_CHECK=true
ENV NODE_PATH=src

COPY . /app
RUN npm install

CMD ["npm", "start"]