const socket = io()

socket.on('connect', () => {
    console.log('Connected to Websocket')
})

socket.on('PRODUCTS_INIT', (products) => {
    console.log(products)
    fetch('http://localhost:8080/table.hbs')
        .then(res => {
            return res.text()
        })
        .then(res => {
            const tableTemplate = Handlebars.compile(res)
            const tableHTML = tableTemplate({ products })
            document.querySelector('#productTable').innerHTML = tableHTML
        })
})

socket.on('MSGS_INIT', (messages) => {
    console.log(messages)
    fetch('http://localhost:8080/messages.hbs')
        .then(res => {
            return res.text()
        })
        .then(res => {
            const chatTemplate = Handlebars.compile(res)
            const chatHTML = chatTemplate({ messages })
            document.querySelector('#chatBox').innerHTML = chatHTML
        })
})

socket.on('NEW_PRODUCT', (product) => {
    document.querySelector('#productTable').append(`<tr>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td><img src="${product.thumbnail}" alt="productPicture"></td>
    </tr>`)
})

socket.on('NEW_MESSAGE', msg => {
    document.querySelector('#chatBox').append(`<p><b>${msg.email}</b> [${msg.date}]: ${msg.message}</p>`)
})

postProduct = () => {
    const name = document.getElementById('name').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    socket.emit('POST_PRODUCT', {name, price, thumbnail})
}

sendMessage = () => {
    const email = document.getElementById('email').value
    const message = document.getElementById('message').value
    const date = new Date()
    const dateString = `${date.toLocaleString()}`
    socket.emit('POST_MESSAGE', {email, dateString, message})
}