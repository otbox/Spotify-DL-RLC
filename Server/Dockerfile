# node:lts-alpine is lightweight version of node 

FROM node:lts-alpine 
RUN apk add --no-cache python3
COPY package*.json ./
WORKDIR /app
COPY . .
RUN npm install 
CMD ["node", "index.js"]
EXPOSE 3000