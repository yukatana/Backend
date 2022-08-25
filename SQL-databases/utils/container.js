//SQL data handling class fit for interacting with databases.

module.exports = class Container {

    constructor(options, tableName) {
        this.options = options
        this.tableName = tableName
    }

    createTable = () => {
        const knex = require('knex')(this.options)

        knex.schema.createTable(this.tableName, (table) => {
        table.increments('id')
        table.string('product_name')
        table.integer('price')
        table.string('thumbnail')
      }).finally(() => knex.destroy())
    }

    getAll = async () => { //returns entire array in the file
        try {
            const knex = require('knex')(this.options)

            const products = await knex.from(this.tableName)
                .select('id', 'product_name', 'price', 'thumbnail')
                .finally(() => knex.destroy())
            return products

        } catch (error) {
            console.log(error)
        }
    }

    save = async (object) => {
        try {
            const knex = require('knex')(this.options)

            knex(this.tableName)
                .insert(
                    {
                        product_name: object.name,
                        price: object.price,
                        thumbnail: object.thumbnail
                    }
                )
                .catch((err) => { console.log(err) })
                .finally(() => knex.destroy())
        } catch (error) {
            console.log(error)
        }
    }

    getById = async (id) => { //returns the object specified by the ID passed as an argument, or null if does not exist
        try {
            let data = await fs.promises.readFile(this.file, "utf-8")
            let parsedData = await JSON.parse(data)
            if (parsedData.find(el => el.id == id)) {
                return parsedData.find(el => el.id == id)
            }
            else {
                return null
            }  
        } catch (err) {
            console.error(err)
        }
    }

    deleteById = async (id) => { //deletes array item (object) specified by ID
        try {
            let data = await fs.promises.readFile(this.file, "utf-8")
            let parsedData = await JSON.parse(data)
            if (parsedData.find(el => el.id == id)) {
                parsedData.splice(parsedData.indexOf(parsedData.find(el => el.id == id)), 1)
                fs.promises.writeFile(this.file, JSON.stringify(parsedData, null, 2))
                return console.log("The item containing the specified ID has been deleted.")
                }
            else {
                console.log("The specified ID does not match any items.")
                return null
            }
        } catch (err) {
            console.error(err)
        }
    }

    deleteAll = async () => { //deletes all objects in the file and replaces them with an empty array
        try {
            await fs.promises.writeFile(this.file, JSON.stringify([]))
            console.log("All items have been deleted.")
        } catch (err) {
            console.error(err)
        }
    }
}