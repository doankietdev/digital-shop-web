# Use a lightweight Node.js base image
FROM node:16.20.2

# Set the working directory in the container
WORKDIR /app

# Copy only the build directory to the container
COPY build /app

# Expose port 3000 for the app
EXPOSE 3000

# Install `serve` to serve the static files
RUN yarn global add serve

# Command to serve the build folder
CMD ["serve", "-s", "/app"]
