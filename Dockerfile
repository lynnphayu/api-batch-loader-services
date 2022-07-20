ARG NODE_IMAGE=node:14-alpine

FROM $NODE_IMAGE 
WORKDIR /usr/src/app
RUN apk update && rm -rf /var/cache/apk/*
RUN npm install -g pnpm
COPY ./ ./
RUN pnpm install
RUN pnpm build

CMD ["pnpm", "start:prod"]
EXPOSE 80/tcp
EXPOSE 8080/tcp
