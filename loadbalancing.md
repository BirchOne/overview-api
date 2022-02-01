# Adding Load Balancing w/ NGINX

## Installing a Prebuilt Debian Package from an OS Repository

1. Update the Debian repository information:

    `$ sudo apt-get update`

2. Install the NGINX Open Source package:

    `$ sudo apt-get install nginx`

3. Verify the installation:

    `$ sudo nginx -v`


Source: [https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/index.html#prebuilt](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/index.html#prebuilt)

## NGINX:

Logs location: `/var/log/nginx`

Check status: `systemctl status nginx.service`

Restart: `sudo systemctl restart nginx`

## Steps To Create Load Balancer:

1. Disable the Default Virtual Host

    ```bash
    sudo unlink /etc/nginx/sites-enabled/default
    ```

2. Create the load balancer

    For this, we should first access the directory using the cd command:

    ```bash
    cd /etc/nginx/sites-available/
    ```

    Then we can create the file using vim:

    ```bash
    sudo vim load-balancer.conf
    ```

    In the file we need to paste in the following:

    ```
    upstream backend {
        server <address-1>;
        server <address-2>;
        ... etc.
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend;
        }
    }
    ```

    Now, activate the directives by linking to **/sites-enabled/** using the following command:

    ```bash
    sudo ln -s /etc/nginx/sites-available/load-balancer.conf /etc/nginx/sites-enabled/load-balancer.conf
    ```


Source: [https://www.hostinger.com/tutorials/how-to-set-up-nginx-reverse-proxy/](https://www.hostinger.com/tutorials/how-to-set-up-nginx-reverse-proxy/)

## Steps To Test Load Balancer w/ loader.io:

We need to be able to verify our app with [loader.io](http://loader.io) by serving the token.

1. In `/var/www/` create a tokens directory & cd into it.
2. Save the token file in that directory.

    i.e. create `loaderio-token-example.txt` w/ content `loaderio-token-example`

3. In `load-balancer.conf`, update to serve the token statically:

    ```
    upstream backend {
        server address-1;
    		server address-2;
    		etc..
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend/;
        }

        location ~ \.txt {
            root /var/www/tokens;
        }
    }
    ```


Source: [https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/](https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/)