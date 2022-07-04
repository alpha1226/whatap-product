const fetch = require('node-fetch')

const orderServerUrl = 'http://localhost:3001'
const getOrdersUrl = `${orderServerUrl}/getOrders`

fetch(orderServerUrl, { method: 'get' })
  .then(() => {
    console.log('connect order server success')
  })
  .catch(() => {
    console.log('connect order server failed')
  })

async function getOrders(productIndex) {
  const getOrdersResult = await fetch(getOrdersUrl, { method: 'get' })

  const orders = await getOrdersResult.json()

  const productOrder = orders.filter((e) =>
    e.products.some((item) => item.productIndex === productIndex)
  )

  return productOrder
}

module.exports = { getOrders }
