# Step 1: Build Stage
FROM node:18 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the Next.js app for production
RUN npm run build

# Step 2: Production Stage
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy the built app from the builder stage
COPY --from=builder /app ./

# Install production dependencies
RUN npm install --production

# Expose port for the Next.js app
EXPOSE 3000

# Start Next.js app in production
CMD ["npm", "start"]
