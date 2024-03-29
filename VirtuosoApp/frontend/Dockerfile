# Step 1: Build the React application
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the React application using serve
FROM node:16-alpine
# Install serve
RUN npm install -g serve
# Copy the build directory from the build step to this new container
COPY --from=build /app/build /frontend
WORKDIR /frontend
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
