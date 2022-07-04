const fetch = require('node-fetch')

const orderServerUrl = 'http://localhost:3001'
const getOrdersUrl = `${orderServerUrl}/getOrders`

fetch(orderServerUrl, { method: 'get' }).then((e) => {
  if (e.status !== 200) {
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  }
  console.log('connect order server success')
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
