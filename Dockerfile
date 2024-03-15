# 基于nginx的官方镜像
FROM nginx:alpine

# 将dist目录（构建产出物）复制到nginx的服务目录
COPY dist/ /usr/share/nginx/html/

# 暴露80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]

