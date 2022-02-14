module.exports = () => {
  const data = {
    products: [],
  }

  for (let index = 0; index < 1000; index++) {
    data.products.push({
      id: index + 1,
      price: Math.floor(Math.random() * (200 - 50 + 1) + 50),
      title: `Camiseta Awesome vol. ${index + 1}`
    })
  }

  return data;
}