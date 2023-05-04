const http = require('http');

const PORT = process.env.PORT || 8080

const server = http.createServer((request,response) => {
    response.end('mi primer server desde el bacckend')
})

server.listen(PORT, ()=>{
    console.log(`Servidor activo y escuchando en el puerto ${PORT}`)
})

