const fs = require('fs')

const fechaYHora = new Date().toLocaleString()



fs.writeFile('./fecha_y_hora.txt', fechaYHora, error => {
        if(error){
            throw new Error(`Error en la creacion del archivo, ${error}`)
        }
        fs.readFile('./fecha_y_hora.txt', 'utf-8', (error, contenido) => {
            if(error) {
                throw new Error(`Error en la lectura del archivo, ${error}`)
            }

            console.log(` La fecha y la hora es: ${contenido}`)
        })

        fs.unlink('./fecha_y_hora.txt', error => {
            if(error){
                throw new Error (`Error eliminando el archivo, ${error}`)
            }
        })
    })
