const express = require('express')

const router = express.Router()
const db = require('../service/db')
const response = require('../service/response')

router.get('/getProducts', async (req, res) => {
  const products = await db.getProducts()

  return response.json(res, products)
})

router.get('/getProduct/:productIndex', async (req, res) => {
  const { productIndex } = req.params
  const product = await db.getProduct(productIndex)

  if (typeof product === typeof []) {
    if (product.length === 0) {
      return response.serverError(res, 'can not find product')
    }
    if (product.length > 1) {
      return response.serverErrorWithObject(
        res,
        '!!!duplicate product index!!!',
        product
      )
    }
  }

  if (!product.available) {
    return response.serverErrorWithObject(res, 'unavailable product', product)
  }

  return response.json(res, product)
})

router.post('/addProduct', async (req, res) => {
  const { name, content } = req.body
  let { stock } = req.body

  if (!name || !content || !stock) {
    return response.badReq(res, '필수값이 없습니다')
  }

  if (typeof stock !== 'number') {
    stock = Number.parseInt(stock, 10)
    if (Number.isNaN(stock)) {
      return response.badReq(res, 'stock is not number')
    }
  }

  const result = await db.addProduct(name, content, stock)

  return response.json(res, result)
})

module.exports = router
