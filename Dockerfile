FROM node

# Create data folder
RUN mkdir /data

# cd to data directory
WORKDIR /data

# Install Gulp and npm dependencies
RUN npm install -g gulp

#Expose web's port
EXPOSE 3000