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

socket.on('MSGS_INIT', (normalizedMessages) => {
    console.log(normalizedMessages)
    const author = new normalizr.schema.Entity('author', {}, {idAttribute: 'email'})
    const comments = new normalizr.schema.Entity('comment', {
        author
    }, {idAttribute: '_id'})
    const denormalizedMessages = normalizr.denormalize(normalizedMessages.result, [comments], normalizedMessages.entities)
    const compressionRatio = parseFloat((JSON.stringify(normalizedMessages).length / JSON.stringify(denormalizedMessages).length)*100).toFixed(2)
    document.querySelector('#ratio').innerHTML = `<h3 class="text-center">Data compression ratio: ${compressionRatio}%</h3>`
    fetch('http://localhost:8080/messages.hbs')
        .then(res => {
            return res.text()
        })
        .then(res => {
            const chatTemplate = Handlebars.compile(res)
            const chatHTML = chatTemplate({ messages: denormalizedMessages })
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
    document.querySelector('#chatBox').append(`<p><b>${msg.author.email}</b> [${msg.dateString}]: ${msg.text}</p>`)
})

postProduct = () => {
    const product_name = document.getElementById('product_name').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    socket.emit('POST_PRODUCT', {product_name, price, thumbnail})
}

sendMessage = () => {
    const author = {
        email: document.getElementById('email').value,
        name: document.getElementById('name').value,
        last_name: document.getElementById('last_name').value,
        age: document.getElementById('age').value,
        alias: document.getElementById('alias').value,
        avatar: document.getElementById('avatar').value
    }
    const text = document.getElementById('message').value
    const date = new Date()
    const dateString = `${date.toLocaleString()}`
    socket.emit('POST_MESSAGE', {author, text, dateString})
}