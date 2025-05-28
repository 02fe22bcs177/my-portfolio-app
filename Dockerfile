# Node base image
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Make sure upload dir exists
RUN mkdir -p uploads

EXPOSE 3000
CMD ["node", "index.js"]
