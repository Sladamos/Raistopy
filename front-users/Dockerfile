FROM node:20
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/front-stops
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENTRYPOINT [ "npm", "run", "preview" ]
