FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN apk update && npm install

COPY . .

RUN npm run build && npm run typeorm:migration:run && npm prune && rm -rf src

CMD npm start
