FROM node:20-alpine as frontbuild
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .



FROM nginx:alpine
COPY --from=frontbuild /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
