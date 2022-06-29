const sql = {
  addProductSql: `INSERT INTO product(name, content, stock) VALUES(?, ?, ?)`,
  getProducts: `SELECT product_index, name, content, stock, createAt FROM product where available=true`,
  getProduct: `SELECT product_index, name, content, stock, createAt, available FROM product where product_index = ?`,
}

module.exports = sql
