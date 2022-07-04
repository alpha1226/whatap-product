const express = require('express')

const router = express.Router()
const db = require('../service/db')
const { getOrders } = require('../service/order')
const response = require('../util/response')
const { isNumber } = require('../util/typecheck')

router.get('/getProducts', async (req, res) => {
  const products = await db.getProducts()

  return response.json(res, products)
})

router.get('/getOrders/:productIndex', async (req, res) => {
  const { productIndex } = req.params

  if (productIndex === undefined) {
    return response.badReq(res, '필수값이 없습니다')
  }

  if (!isNumber(productIndex)) {
    return response.badReq(res, 'productIndex is not number')
  }

  const orders = await getOrders(Number.parseInt(productIndex, 10))
  return res.json({ message: 'get orders', orders })
})

router.get('/getProduct/:productIndex', async (req, res) => {
  const { productIndex } = req.params

  if (!productIndex) {
    return response.badReq(res, '필수값이 없습니다')
  }
  if (!isNumber(productIndex)) {
    return response.badReq(res, 'productIndex is not number')
  }

  const product = await db.getProduct(productIndex)

  if (product === undefined) {
    return response.serverError(res, 'can not find product')
  }

  if (typeof product === typeof [] && product.length > 2) {
    return response.serverErrorWithObject(
      res,
      '!!!duplicate product index!!!',
      product
    )
  }

  if (!product.available) {
    return response.serverErrorWithObject(res, 'unavailable product', product)
  }

  return response.json(res, product)
})

router.post('/addProduct', async (req, res) => {
  const { name, content } = req.body
  const { stock } = req.body

  if (!name || !content || !stock) {
    return response.badReq(res, '필수값이 없습니다')
  }

  if (!isNumber(stock)) {
    return response.badReq(res, 'stock is not number')
  }

  const insertResult = await db.addProduct(name, content, stock)

  if (!insertResult.result) {
    return response.serverErrorWithObject(
      res,
      'product insert fail',
      insertResult
    )
  }

  return response.json(res, insertResult)
})

router.put('/updateProduct/:productIndex', async (req, res) => {
  const { productIndex } = req.params
  const { name, content, stock } = req.body
  let { available } = req.body

  console.log(req.body)

  if (!name || !content || stock === undefined || available === undefined) {
    return response.badReq(res, '필수값이 없습니다.')
  }

  if (!isNumber(stock)) {
    return response.badReq(res, 'stock is not number')
  }
  if (!isNumber(productIndex)) {
    return response.badReq(res, 'productIndex is not number')
  }

  try {
    if (available === 0) available = false
    if (available === 1) available = true
    available = JSON.parse(available)
    if (typeof available !== typeof true) {
      throw new Error('wrong type on available')
    }
  } catch (e) {
    return response.badReq(res, 'available is not boolean type')
  }

  const product = await db.getProduct(productIndex)

  if (!product) {
    return response.serverError(res, 'cannot find product')
  }

  const updateResult = await db.updateProduct(
    productIndex,
    name,
    content,
    stock,
    available
  )

  if (!updateResult.result) {
    return response.serverErrorWithObject(
      res,
      'product update fail',
      updateResult
    )
  }

  return response.json(res, updateResult)
})

router.delete('/deleteProduct/:productIndex', async (req, res) => {
  const { productIndex } = req.params
  console.log(req.params.productIndex)

  if (!productIndex) {
    return response.badReq(res, '필수값이 없습니다')
  }
  if (!isNumber(productIndex)) {
    return response.badReq(res, 'productIndex is not number')
  }

  const product = await db.getProduct(productIndex)

  if (!product) {
    return response.serverError(res, 'can not find product')
  }

  const deleteResult = await db.deleteProduct(productIndex)

  if (deleteResult.reulst === false) {
    return response.serverErrorWithObject(res, 'delete fail', deleteResult)
  }

  return response.json(res, deleteResult)
})

module.exports = router
