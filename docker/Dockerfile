FROM nginx
WORKDIR /usr/share/nginx/html
COPY ../build .
COPY ../docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ../docker/start-nginx.sh /usr/bin/start-nginx.sh
ENTRYPOINT [ "start-nginx.sh" ]
