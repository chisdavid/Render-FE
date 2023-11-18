# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]