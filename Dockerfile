FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN apk update && npm install -g pnpm@^8.0.0 && pnpm install

COPY . .

RUN pnpm build && pnpm prune && rm -rf src

CMD pnpm start
