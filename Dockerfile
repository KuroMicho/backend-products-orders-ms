# Usa una imagen base ligera de Node
FROM node:18-alpine

WORKDIR /src

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]