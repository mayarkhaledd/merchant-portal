FROM node:20 AS build

WORKDIR /app

# Add npm 9.3.1
RUN npm install -g npm@9.3.1

COPY package*.json ./

COPY eds-react-1.1.17.tgz ./

RUN npm install

COPY . .

RUN npm run build
 
FROM nginx:stable-alpine
 
# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

# Debugging step: Output the contents of default.conf
RUN cat /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

