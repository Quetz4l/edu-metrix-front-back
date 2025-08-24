FROM node:24-alpine
LABEL authors="quetz4l"

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "run", "dev"]