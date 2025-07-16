FROM node:20.19.2-slim AS build

WORKDIR /app

COPY package.json /pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile

COPY / ./

RUN pnpm run build

FROM nginx:1.28.0-alpine3.21 AS runtime

COPY --from=build /app/dist /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf