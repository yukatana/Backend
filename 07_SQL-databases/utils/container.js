//SQL data handling class fit for interacting with databases - products version.

module.exports = class Container {

    constructor(options, tableName) {
        this.options = options
        this.tableName = tableName
    }

    createTable = async () => {
        const knex = require('knex')(this.options)

        try {
          knex.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('product_name')
            table.integer('price')
            table.string('thumbnail')
      }).finally(() => knex.destroy())  
        } catch (error) {
            console.log(error)
        }
    }

    getAll = async () => { //returns entire array in the file
        try {
            const knex = require('knex')(this.options)

            const products = await knex.from(this.tableName)
                .select()
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
                ).finally(() => knex.destroy())
        } catch (error) {
            console.log(error)
        }
    }

    getById = async (id) => { //returns the object specified by the ID passed as an argument, or null if does not exist
        try {
            const knex = require('knex')(this.options)

            product = await knex.from(this.tableName)
                .select()
                .where('id', id)
                .finally(() => knex.destroy())
            return product
        } catch (error) {
            console.log(error)
            return null
        }
    }

    deleteById = async (id) => { //deletes array item (object) specified by ID
        try {
            const knex = require('knex')(this.options)

            knex.from(this.tableName)
                .where('id', id)
                .del()
                .then(console.log("The item containing the specified ID has been deleted."))
                .finally(() => knex.destroy())
        } catch (error) {
            console.log(error)
            return null
        }
    }

    deleteAll = async () => { //deletes all objects in the file and replaces them with an empty array
        try {
            const knex = require('knex')(this.options)

            knex.from(this.tableName)
                .del()
                .then(console.log("All items have been deleted."))
                .finally(() => knex.destroy())
        } catch (error) {
            console.log(error)
        }
    }
}