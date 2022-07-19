class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros || []
        this.mascotas = mascotas || []
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
    }

    countMascotas() {
        return this.mascotas.length
    }

    addBook(nombre, autor) {
        this.libros.push({nombre: nombre, autor: autor})
    }

    getBookNames() {
        return this.libros.map(e => {
            return e.nombre
        })
    }
}

const me = new Usuario("Rommel", "Aranguren")

console.log(me.getFullName())

me.addMascota("Ascaris Lumbricoides")
me.addMascota("Taenia saginata")
console.log(me.countMascotas())

me.addBook("A Song of Ice and Fire", "George R.R. Martin")
me.addBook("The Witcher", "Andrzej Sapkowski")

console.log(me.getBookNames())