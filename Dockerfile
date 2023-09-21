FROM node18.17.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 8080

CMD ["npm" "start"]
