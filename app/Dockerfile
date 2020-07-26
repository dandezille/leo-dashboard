FROM node:latest

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install
RUN yarn build

EXPOSE 8000

CMD ["npx", "serve", "-s", "/build", "-l" "8000"]
