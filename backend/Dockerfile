# Use Node.js LTS version
FROM node:22-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV MONGO_URI=mongodb://mongodb:27017/ecommerce
ENV JWT_SECRET=abc123456789

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]