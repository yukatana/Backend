const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

const nombres = productos.map(el => el.nombre)
const nombresStr = nombres.join(", ")

const precioTotal = productos.reduce(((acc, el) => el.precio + acc), 0)

// const precios = productos.map(el => el.precio)
// const menorPrecio = precios.sort((a, b) => a - b)[0]
// const mayorPrecio = precios.sort((a, b) => b - a)[0]

const preciosOrdenados = productos.sort((a, b) => {
    return a.precio > b.precio ? 1 : -1
})

const menorPrecio = preciosOrdenados[0]
const mayorPrecio = preciosOrdenados[preciosOrdenados.length-1]
const redondeados = precioTotal/productos.length

console.log( {
    nombresStr,
    precioTotal,
    menorPrecio,
    mayorPrecio,
    redondeados
})