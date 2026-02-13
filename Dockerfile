FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
# Run as non-root user for security
USER node
CMD ["node", "server.js"]
