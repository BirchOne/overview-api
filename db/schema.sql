DROP DATABASE IF EXISTS overview;

CREATE DATABASE overview;

USE overview;

CREATE TABLE products (
  id INTEGER NOT NULL AUTO_INCREMENT,
  campus VARCHAR(10) NOT NULL,
  name VARCHAR(20) NOT NULL,
  slogan VARCHAR(50) NOT NULL,
  description VARCHAR(100) NOT NULL,
  category VARCHAR(20) NOT NULL,
  default_price DECIMAL(10, 2) NOT NULL,
  created_at VARCHAR(30) NOT NULL,
  updated_at VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'features'
--
-- ---

-- this can be rolled into the products table
-- features related to producs, would not need to change
-- if there is a change, it could just be a new product

CREATE TABLE features (
  id INTEGER NOT NULL AUTO_INCREMENT,
  id_products INTEGER NOT NULL,
  feature VARCHAR(20) NOT NULL,
  value VARCHAR(20) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_products)
    REFERENCES products(id)
);

-- ---
-- Table 'styles'
--
-- ---

CREATE TABLE styles (
  id INTEGER NOT NULL AUTO_INCREMENT,
  id_products INTEGER NOT NULL,
  name VARCHAR(20) NOT NULL,
  original_price DECIMAL(10, 2) NOT NULL,
  sale_price DECIMAL(10, 2) DEFAULT NULL,
  default BOOLEAN DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_products)
    REFERENCES products (id)
);

-- ---
-- Table 'photos'
--
-- ---

CREATE TABLE photos (
  id INTEGER NOT NULL AUTO_INCREMENT,
  id_products INTEGER NOT NULL,
  id_styles INTEGER NOT NULL,
  thumbnail_url VARCHAR(200) NOT NULL,
  url VARCHAR(200) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_products)
    REFERENCES products (id),
  FOREIGN KEY (id_styles)
    REFERENCES styles (id)
);

-- ---
-- Table 'skus'
--
-- ---

CREATE TABLE skus (
  id INTEGER NOT NULL AUTO_INCREMENT,
  id_products INTEGER NOT NULL,
  id_styles INTEGER NOT NULL,
  quantity TINYINT NOT NULL,
  size VARCHAR(3) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_products)
    REFERENCES products (id),
  FOREIGN KEY (id_styles)
    REFERENCES styles (id)
);

-- ---
-- Table 'skus'
--
-- ---

CREATE TABLE related (
  id INTEGER NOT NULL AUTO_INCREMENT,
  id_products INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_products)
    REFERENCES products (id),
);
