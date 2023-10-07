FROM node:latest

COPY . /app

ARG user
ARG uid

WORKDIR /app

RUN apt update && apt upgrade -y

RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user && \
    chown -R $user:$user /home/$user && \
    chown -R $user:$user /app

RUN npm install -g @nestjs/cli;

USER $user

EXPOSE 3000

CMD ["/bin/sh", "-c", "npm install;npm run dev"]