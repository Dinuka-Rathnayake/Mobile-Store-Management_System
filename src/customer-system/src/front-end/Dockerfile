# Use the official Node.js image as base
FROM node:16
# RUN apk update && apk add git

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .
# COPY ./public ./public



# Install dependencies
RUN npm install

# Copy the entire client to the working directory	
COPY . .

# Build the React app
# RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]