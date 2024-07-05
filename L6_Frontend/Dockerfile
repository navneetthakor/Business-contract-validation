FROM node:21.5.0 as build

WORKDIR /usr/app/

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm" , "run" , "start" ]