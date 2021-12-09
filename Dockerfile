FROM node:16.7.0
WORKDIR /application
COPY package.json /application
COPY yarn.lock /application
RUN yarn install
COPY . /application
CMD ["yarn", "start"]