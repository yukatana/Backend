const mostrarLetras = (string, callback) => {
    let index = 0
    const interval = setInterval(() => {
        let letra = string[index++]
        if (letra) {
            console.log(letra)
        }
        else {
            clearInterval(interval)
            callback()
        }
    }, 1000)
}

const fin = () => console.log("terminé!")

setTimeout(mostrarLetras, 0, "testing", fin) // since mostrarLetras is passed as a callback function, it cannot receive arguments in ()
//under this syntax, any arguments that would be passed to the callback function are passed as arguments directly to setTimeout

setTimeout(() => {mostrarLetras("testing", fin)}, 500) //the above can be circumvented by passing an anonymous arrow function instead
//in this case, arguments can be specified within the function called upon by the arrow function, since it is read as a callback

setTimeout(() => {mostrarLetras("testing", fin)}, 2000)