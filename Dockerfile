FROM node:latest

WORKDIR /app

COPY . /app

# ENV NODE_ENV=production

# RUN npm install serve -g

# RUN npm install -g npm@9.6.2

RUN npm install

RUN npm run build

EXPOSE 3306

CMD ["npm", "run", "preview"]