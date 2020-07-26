FROM node:latest AS builder

RUN mkdir /app
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

FROM nginx:latest

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
