FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# Build the Next.js app
RUN npx prisma generate
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the Next.js app in production
CMD ["npm", "start"]


# chatgpt ahh