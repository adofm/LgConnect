# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy all other files including src folder
COPY . .

# Expose the port your app runs on
EXPOSE 5001

# Start the server
CMD ["node", "src/index.js"]
