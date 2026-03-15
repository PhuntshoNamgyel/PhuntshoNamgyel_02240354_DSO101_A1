FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
RUN npm install -g serve
COPY --from=build /app/build /app/build
EXPOSE 80
CMD ["serve", "-s", "/app/build", "-l", "80"]