FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", " && npm start"]
