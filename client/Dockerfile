# node:lts-alpine is lightweight version of node 

FROM node:lts-alpine 
COPY package*.json ./
WORKDIR /app
COPY . .
RUN npm install
CMD ["yarn", "dev"]
EXPOSE 8080