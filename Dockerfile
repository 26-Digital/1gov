# Base on official Node.js Alpine image
FROM node:alpine

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
RUN npm install --global pm2

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies including 'sharp' for image optimization
RUN npm install --production && \
    npm install autoprefixer && \
    npm install sharp

# Copy all files
COPY ./ ./

# Build app
RUN npm run build

# Expose the listening port
#EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "npm", "--", "start" ]