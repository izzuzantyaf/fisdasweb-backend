FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN apk update && npm install -g pnpm && pnpm install

COPY . .

RUN pnpm run build && pnpm prune && rm -rf src

CMD npm run migration:run && pnpm start
