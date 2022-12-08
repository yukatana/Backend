const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true}
}, {timestamps: true})

const Product = model('products', ProductSchema)

module.exports = Product
