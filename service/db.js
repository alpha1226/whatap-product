const database = require('mysql2-promise')()

const sql = require('./sql')

/**
 * database configure
 */
database.configure({
  host: 'rikroy.iptime.org',
  user: 'whatap',
  password: 'whatap',
  database: 'whatap',
})

/** 전체 상품 조회 */
async function getProducts() {
  const result = await database.query(sql.getProducts).spread((rows) => rows)
  return result
}

/** 단일 상품 조회 */
async function getProduct(productIndex) {
  const result = await database
    .query(sql.getProduct, [productIndex])
    .spread((rows) => rows)

  return result.length <= 1 ? result[0] : result
}

/** 상품 추가 */
async function addProduct(name, content, stock) {
  const insertResult = await database
    .query(sql.addProductSql, [name, content, stock])
    .spread((r) => r)
  if (insertResult.affectedRows === 0) {
    return {
      result: false,
      message: '상품 추가 실패, 변경된 row가 없음',
    }
  }

  const product = await getProduct(insertResult.insertId)
  return {
    result: true,
    message: '상품 추가 성공',
    product,
  }
}

/** 상품 정보 수정 */
async function updateProduct(productIndex, name, content, stock, available) {
  const result = await database
    .query(sql.updateProduct, [name, content, stock, available, productIndex])
    .spread((r) => r)

  if (result.affectedRows === 0) {
    return {
      result: false,
      message: '상품 정보 변경 실패',
    }
  }

  const product = await getProduct(productIndex)
  return {
    result: true,
    message: '상품 정보 변경 성공',
    product,
  }
}

/** 상품 삭제 */
async function deleteProduct(productIndex) {
  const result = await database
    .query(sql.deleteProduct, [productIndex])
    .spread((rows) => rows)

  if (result.affectedRows === 0) {
    return { result: false, message: '상품 삭제 실패' }
  }

  const product = await getProduct(productIndex)

  if (product) return { result: false, message: '상품 삭제 실패' }

  return { result: true, message: '상품 삭제 성공' }
}

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
}
