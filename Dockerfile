FROM node:20.17.0-bullseye-slim

WORKDIR /usr/src/app

COPY package*.json ./

# Install build dependencies and NestJS CLI
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && npm install -g @nestjs/cli \
    && npm install --include=dev \
    && npm rebuild bcrypt --build-from-source \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]