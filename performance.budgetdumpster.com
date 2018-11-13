# WARNING this file is generated from Jenkins, changing it on the server will only be temporary
server {
    listen 80;
    server_name performance.budgetdumpster.com;

    location / {
        root   /usr/share/nginx/html/dunamis-{{ replaceMe }}/public{{andMe}};
        try_files $uri $uri/ /index.html$args;
        index  index.html index.htm;
    }

    location /api {
        proxy_pass http://dunamis_backend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
