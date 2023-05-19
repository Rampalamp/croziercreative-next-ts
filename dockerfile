FROM node:14

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --network-timeout 60000

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn","start"]