# node:lts-alpine is lightweight version of node 

FROM node:lts-alpine 
COPY package*.json ./
WORKDIR /app
# RUN npm install --only=production
COPY dist ./dist 
RUN npm install -g http-server
CMD ["http-server","dist", "-p", "8080"]
EXPOSE 8080
