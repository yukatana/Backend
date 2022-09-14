const socket = io()

socket.on('connect', () => {
    console.log('Connected to Websocket')
})

socket.on('TEST_INIT', (testProducts) => {
    console.log(testProducts)
    fetch('http://localhost:8080/table.hbs')
        .then(res => {
            return res.text()
        })
        .then(res => {
            const tableTemplate = Handlebars.compile(res)
            const tableHTML = tableTemplate({ products: testProducts })
            document.querySelector('#productTable').innerHTML = tableHTML
        })
})