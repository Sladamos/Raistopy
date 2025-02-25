FROM node:20
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
