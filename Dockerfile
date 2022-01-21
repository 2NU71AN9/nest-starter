FROM node:latest

# 执行命令，创建文件夹
RUN mkdir -p /usr/src/work_space/my_nest
# 将nestapi目录拷贝到镜像里，也可用COPY命令
COPY . /usr/src/work_space/my_nest
# 执行镜像的工作目录
WORKDIR /usr/src/work_space/my_nest

RUN npm install

RUN npm run build

# 配置系统变量，指定端口
ENV HOST 0.0.0.0
ENV PORT 80

# 开放端口
EXPOSE 80

# 容器启动命令
CMD ["node","dist/main.js"]