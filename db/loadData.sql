\c overview;

\COPY products FROM './db/data/product.csv' WITH DELIMITER ',' CSV HEADER;
\COPY features FROM './db/data/features.csv' WITH DELIMITER ',' CSV HEADER;
\COPY styles FROM './db/data/styles.csv' WITH DELIMITER ',' NULL AS 'null' CSV HEADER;
\COPY photos FROM './db/data/photosfixed.csv' WITH DELIMITER ',' NULL AS 'null' CSV HEADER;
\COPY skus FROM './db/data/skus.csv' WITH DELIMITER ',' NULL AS 'null' CSV HEADER;
\COPY related FROM './db/data/related.csv' WITH DELIMITER ',' NULL AS 'null' CSV HEADER;

ALTER TABLE products ADD COLUMN created_at DATE DEFAULT CURRENT_DATE;
ALTER TABLE products ADD COLUMN updated_at DATE DEFAULT CURRENT_DATE;
