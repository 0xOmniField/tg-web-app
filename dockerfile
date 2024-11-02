FROM node:20 AS build
WORKDIR /app

COPY . /app/
RUN  rm -rf node_modules package-lock.json && npm install  && npm run build

FROM nginx:alpine

# 复制构建后的静态文件到 Nginx 目录
COPY --from=build /app/dist /usr/share/nginx/html

# 复制 Nginx 配置文件到 Nginx 配置目录
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 Nginx 默认端口
EXPOSE 80
