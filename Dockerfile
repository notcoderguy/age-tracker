# Use the official Node.js 20 image.
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install NPM 10 (if not included in the Node image) and application dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the React application
RUN npm run build

# Install serve to run the application.
RUN npm install -g serve

# The port that your application listens to in the container
EXPOSE 80

# Command to run the application using serve
CMD ["serve", "-s", "build", "-l", "80"]
