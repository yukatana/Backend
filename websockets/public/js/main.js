const socket = io()

socket.on('connect', () => {
    console.log('Connected to Websocket')
})

socket.on('productList', (products) => {
    console.log(products)
    fetch('http://localhost:8080/table.hbs')
        .then(res => {
            return res.text()
        })
        .then(res => {
            const tableTemplate = Handlebars.compile(res)
            const tableHTML = tableTemplate({items: products, dataExists: products.length > 0 ? true : false})
            document.querySelector('#productTable').innerHTML = tableHTML
        })
})