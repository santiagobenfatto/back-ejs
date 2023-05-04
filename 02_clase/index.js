/* 

-->Realizar una lista nueva  (array) que contenga todos los tipos de productos (no cantidades), consejo: utilizar Object.keys y Array.includes. Mostrar el array por consola.

-->Posteriormente, obtener el total de productos vendidos por todos los objetos (utilizar Object.values)

*/

const objetos =  [
	{
		manzanas:3,
		peras:2,
		carne:1,
		jugos:5,
		dulces:2
	},
	{
		manzanas:1,
		sandias:1,
		huevos:6,
		jugos:1,
		panes:4
	}
]

let productos = []
for (const prod of objetos) {
	if(!objetos.includes(prod)){
		productos.push(prod)
	}
}

console.log(productos)

// let totalPropiedades = [...productos0, ...productos1]
// console.log(totalPropiedades)


let cantidad0 = Object.values(objetos[0])
let cantidad1 =  Object.values(objetos[1])

let cantidades = [...cantidad0,...cantidad1]

// console.log(cantidades)

let totalCantidad = cantidades.reduce((acc, currentValue) => currentValue + acc )

console.log(totalCantidad)

/** AHORA HACERLO CON ARRAY.INCLUDES() */