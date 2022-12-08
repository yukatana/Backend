class ProductDTO {
    constructor(product) {
        this.name = product.name
        this.price = product.price
        this.thumbnail = product.thumbnail
    }

    toClient = () => {
        return {
            name: this.name,
            price: this.price,
            thumbnail: this.thumbnail
        }
    }

    static getAllToClient = (products) => {
        return products.map((product) => {
            new ProductDTO(product).toClient()
            }
        )
    }
}

module.exports = ProductDTO