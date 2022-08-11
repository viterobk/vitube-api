FROM node:16.16-alpine as vitube_api
ENV PATH $PATH:/app/node_modules/.bin
# Create app directory
WORKDIR /app

EXPOSE 3000
EXPOSE 9229

COPY package.json yarn.lock /app/
RUN yarn
COPY . /app
CMD ["yarn", "start:development"]