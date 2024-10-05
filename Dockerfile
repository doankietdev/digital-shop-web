# Dockerfile for Create React App
FROM node:16.20.2

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Serve the React app using a simple HTTP server
RUN yarn global add serve
CMD ["serve", "-s", "build"]