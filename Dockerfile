# Use the official Node.js 20 image.
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install the app's dependencies
RUN pnpm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the React application
RUN pnpm run build

# Install serve to run the application.
RUN pnpm install -g serve

# The port that your application listens to in the container
EXPOSE 80

# Command to run the application using serve
CMD ["serve", "-s", "build", "-l", "80"]
