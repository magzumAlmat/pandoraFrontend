FROM node:18-alpine

COPY . /frontend

WORKDIR /frontend

EXPOSE 3000

RUN npm install

CMD ["npm", "run", "dev"]

