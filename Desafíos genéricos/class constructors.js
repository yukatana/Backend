/*const emptyArray = []
const testArray = ["hello", "it's me"]
function mostrarLista(array) {
    if (array.length > 0) {
        console.log(array)
    }
    else {
        console.log("lista vacía :(")
    }
}

mostrarLista(emptyArray)
mostrarLista(testArray)

(function(a, b, c) {
    console.log(a + b + c)
})(10, 15, 20)

function crearMultiplicador(a) {
    return function (b) {
        console.log(a*b)
    }
}

const duplicar = crearMultiplicador(2)
const triplicar = crearMultiplicador(3)

duplicar(3)
triplicar(3)*/

class Contador {
    constructor (nombre) {
        this.nombre = nombre
        this.cuenta = 0
    }

    static cuentaGlobal = 0

    obtenerResponsable() {
        return this.nombre
    }

    obtenerCuentaIndividual() {
        return this.cuenta
    }

    static obtenerCuentaGlobal() {
        return Contador.cuentaGlobal
    }

    contar() {
        this.cuenta++
        Contador.cuentaGlobal++
    }
}

Contador.contar()
console.log(Contador.obtenerCuentaGlobal())