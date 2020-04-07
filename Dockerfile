FROM node:13.10.1

MAINTAINER matt404 <docker@mswis.com>

ENV APP_DIRECTORY /usr/src/app
ENV PUBLIC_DIRECTORY /usr/src/app/public

# Create app directory
RUN mkdir -p $APP_DIRECTORY
RUN mkdir -p $PUBLIC_DIRECTORY
WORKDIR $APP_DIRECTORY

# Install app dependencies
COPY ./server/index.js $APP_DIRECTORY
COPY ./server/package.json $APP_DIRECTORY
RUN npm install

# Bundle app source
COPY ./build $PUBLIC_DIRECTORY

EXPOSE 3000
CMD [ "npm", "start" ]