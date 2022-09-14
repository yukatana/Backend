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
    console.log(msg)
    document.querySelector('#chatBox').append(`<p><b>${msg.author.id}</b> [${msg.message.dateString}]: ${msg.message.text}</p>`)
})

postProduct = () => {
    const product_name = document.getElementById('product_name').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    socket.emit('POST_PRODUCT', {product_name, price, thumbnail})
}

sendMessage = () => {
    const author = {
        id: document.getElementById('email').value,
        name: document.getElementById('name').value,
        last_name: document.getElementById('last_name').value,
        age: document.getElementById('age').value,
        alias: document.getElementById('alias').value,
        avatar: document.getElementById('alias').value
    }
    const text = document.getElementById('message').value
    const date = new Date()
    const dateString = `${date.toLocaleString()}`
    socket.emit('POST_MESSAGE', {author, message: {text, dateString}})
}