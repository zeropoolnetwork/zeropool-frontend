FROM nginx
WORKDIR /usr/share/nginx/html
COPY ../build .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./start-nginx.sh /usr/bin/start-nginx.sh
ENTRYPOINT [ "start-nginx.sh" ]
