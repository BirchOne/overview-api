const queryDB = require('../../db/queryDB');

exports.getMany = async (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;

  const query = `
    SELECT *
    FROM products
    WHERE id >= ${(page - 1) * count + 1} AND id <= ${page * count}
  `;

  try {
    const result = await queryDB(query);

    res.send(result.rows);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.getOne = async (req, res) => {
  const id = req.params.product_id;

  const query = `
    SELECT *,
    (
      SELECT json_agg(x) FROM (
        SELECT feature, value FROM features WHERE product_id = ${id}
      ) x
    ) features
    FROM products WHERE id = ${id}
  `;

  try {
    const result = await queryDB(query);

    res.send(result.rows[0]);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.getStyles = async (req, res) => {
  const id = req.params.product_id;

  const query = `
    SELECT id as style_id, name, original_price, sale_price, default_style as "default?",
    (
      SELECT json_agg(x) FROM (
        SELECT thumbnail_url, url FROM photos WHERE style_id = styles.id
      ) x
    ) photos,
    (
      SELECT json_object_agg(id, x) FROM (
        SELECT id, quantity, size FROM skus WHERE style_id = styles.id
      ) as x
    ) skus
    FROM styles WHERE product_id = ${id}
  `;

  try {
    const result = await queryDB(query);

    const data = {
      product_id: id,
      results: result.rows,
    };

    res.send(data);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.getRelated = async (req, res) => {
  const id = req.params.product_id;

  const query = `
    SELECT related_id
    FROM related
    WHERE product_id = ${id}
  `;

  try {
    const result = await queryDB(query);

    const data = result.rows.map((item) => item.related_id);

    res.send(data);
  } catch (err) {
    res.sendStatus(500);
  }
};
