FROM node:24-alpine
LABEL authors="quetz4l"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

ENTRYPOINT ["npm", "run", "dev"]