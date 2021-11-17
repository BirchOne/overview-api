DROP DATABASE IF EXISTS overview;


CREATE DATABASE overview;
\c overview;


CREATE TABLE products (
  id SERIAL NOT NULL,
  name VARCHAR(20) NOT NULL,
  slogan VARCHAR(50) NOT NULL,
  description VARCHAR(500) NOT NULL,
  category VARCHAR(20) NOT NULL,
  default_price DECIMAL(10, 2) NOT NULL,
  created_at VARCHAR(30) NOT NULL,
  updated_at VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE features (
  id SERIAL NOT NULL,
  product_id SERIAL NOT NULL,
  feature VARCHAR(20) NOT NULL,
  value VARCHAR(20) NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id)
    REFERENCES products (id)
);

CREATE TABLE styles (
  id SERIAL NOT NULL,
  product_id SERIAL NOT NULL,
  name VARCHAR(20) NOT NULL,
  original_price DECIMAL(10, 2) NOT NULL,
  sale_price DECIMAL(10, 2) DEFAULT NULL,
  default_style BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id)
    REFERENCES products (id)
);

CREATE TABLE photos (
  id SERIAL NOT NULL,
  product_id SERIAL NOT NULL,
  styles_id SERIAL NOT NULL,
  thumbnail_url VARCHAR(200) NOT NULL,
  url VARCHAR(200) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id)
    REFERENCES products (id),
  FOREIGN KEY (styles_id)
    REFERENCES styles (id)
);

CREATE TABLE skus (
  id SERIAL NOT NULL,
  product_id SERIAL NOT NULL,
  styles_id SERIAL NOT NULL,
  -- make enum
  size VARCHAR(3) NOT NULL,
  quantity SMALLSERIAL NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id)
    REFERENCES products (id),
  FOREIGN KEY (styles_id)
    REFERENCES styles (id)
);

CREATE TABLE related (
  id SERIAL NOT NULL,
  product_id SERIAL NOT NULL,
  related_id SERIAL NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id)
    REFERENCES products (id)
);
