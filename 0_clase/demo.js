console.log('Hola mundo')
console.warn('Mensaje de advertencia')
console.error('Mensaje de error')




// ==== EJERCICIO DE CLASE ====

// Definir variables que almacenen datos (nombre, edad, precio, nombres de series y películas), mostrar esos valores por consola, incrementar la edad en 1, una serie a la lista y volver a mostrarlas. Compartir la definición en el Visual Studio Code.

const persona = {
    nombre: 'Santiago',
    edad:30,
}
console.log(`La persona se llama ${persona.nombre}, tiene ${persona.edad} años`)
console.log(`Cumplirá ${persona.edad++} en noviembre`)
console.log(persona.edad++)

const producto = {
    nombre:'Alfajor Aguila',
    precio:250
}
console.log(`El producto es ${producto.nombre} y su precio es ${producto.precio}`)
const seriesYPeliuclas = [
    series=[
        {serie:'friends'},
        {serie:'alf'}
    ],
    peliculas=[
        {peliculas:'El señor de los anillos'},
        {peliculas:'Mohana'}
    ]
]

const nuevaPelicula = {peliculas:'Lilo y Stich'}
seriesYPeliuclas[1].push(nuevaPelicula)

console.log(seriesYPeliuclas[0])
console.log(seriesYPeliuclas[1])
