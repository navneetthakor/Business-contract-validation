FROM node:21.5.0

WORKDIR /usr/app/

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 3001

ENV MONGO_URI=mongodb+srv://rohanshu:rohanshubanodha@businesscontractvalidat.s05ppiq.mongodb.net/?retryWrites=true&w=majority&appName=BusinessContractValidation/test
ENV JWT_SECRET=BusinessContractValidation
ENV MODEL_URL=http://localhost:8000
ENV BACKEND_URL=http://localhost:3001
ENV PORT=3001
ENV CLOUD_NAME=deziazvyp
ENV API_KEY=115335176222945
ENV API_SECRET=-AJDclFmKfBgeaPqfQtbHqd8sgQ

CMD [ "npm" , "start" ]