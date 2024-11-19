FROM node:20
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "run" ]
CMD [ "start:prod" ]
