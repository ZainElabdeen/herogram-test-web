# Step 1: Build the React app
FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the React app source code
COPY . ./

# Build the React app for production
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build files from the previous step
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
