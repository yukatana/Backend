const fs = require("fs")

class Container {
    constructor(file) {
        this.file = file
    }

    save = async (object) => {
        try {
            let data = await fs.promises.readFile(this.file, "utf-8")
            let parsedData

            try {
                parsedData = await JSON.parse(data)
            } catch (err) { //executed when the file does not contain JSON-compatible information or is empty
                parsedData = []
            }
 

            if (parsedData.length > 0) { //executed if the file already has an array in it
                object.id = parsedData[parsedData.length-1].id+1
                parsedData.push(object)
                await fs.promises.writeFile(this.file, JSON.stringify(parsedData, null, 2))
                return object.id
            }
            else { //executed when the file contains some other JSON compatible data that's not an array (i.e.: an object)
                parsedData = []
                object.id = 1
                parsedData.push(object)
                await fs.promises.writeFile(this.file, JSON.stringify(parsedData, null, 2))
                return object.id
            }
        } catch (err) {
            console.log(err)
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

    getAll = async () => { //returns entire array in the file
        try {
            let data = await fs.promises.readFile(this.file, "utf-8")
            return JSON.parse(data)
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
                console.log("The item containing the specified ID has been deleted.")
                }
            else {
                console.log("The specified ID does not match any items.")
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

const Trypanosoma = {
    name: "Trypanozoma cruzi",
    price: 10,
    thumbnail: "https://api.docred.com/cms/images/195/feed"
}

const Giardia = {
    name: "Giardia intestinalis",
    price: 20,
    thumbnail: "https://www.researchgate.net/profile/Hadi-Abd/publication/290433467/figure/fig2/AS:616376788062236@1523967086818/The-figure-demonstrates-the-protozoic-parasite-Giardia-intestinalis-cysts-1000x_Q640.jpg"
}

const Staph = {
    name: "Staphylococcus aureus",
    price: 30,
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Staphylococcus_aureus_bacteria_escape.jpg"
}

const productos = new Container("productos.txt")

setTimeout(productos.save, 0, Staph)
setTimeout(productos.save, 100, Giardia)
setTimeout(productos.save, 200, Trypanosoma)

setTimeout(async () => {console.log(await productos.getById(3))}, 300)
setTimeout(async () => {console.log(await productos.getAll())}, 400)

setTimeout(productos.deleteById, 500, 2)

//productos.deleteAll()