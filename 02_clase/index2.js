class TicketManager {
    #precioBaseDeGanancia =  0.15
    constructor(){
        this.eventos
    }

    getEventos = () => {
        return this.eventos
    }

    agregarEvento = (
        nombre,
        lugar,
        precio,
        capacidad=50,
        fecha= new Date().toLocaleDateString()
        ) => {
            const evento = {
                nombre,
                lugar,
                precio,
                capacidad,
                fecha,
                participantes: []
            }

            if (this.eventos === 0){
                evento.id = 1 
            } else {
                evento.id = this.eventos[this.eventos.length -1].id +1
            }

        
            this.eventos.push(evento)
        }

    agregarUsuario = (eventoId, usuarioId) => {
        const eventoIndex = this.eventos.findIndex(evento =>evento.id === eventoId)
        //Cuando findIndex retorna -1 significa que no encontró el parámetro
        if(eventoIndex === -1){
            console.log(`Este evento no existe`)
            return
        }

        const registroUsuario = this.eventos[eventoIndex].participantes.includes(usuarioId)

        if(registroUsuario){
            console.log(`El usuario ya se encontraba registrado`)
            return
        }

        this.eventos[eventoIndex].participantes.push(usuarioId)
    }

    /* 
        Debe contar con un método “ponerEventoEnGira” El cual recibirá:
        id del evento
        nueva localidad
        nueva fecha
        El método debe copiar el evento existente, con una nueva localidad, nueva fecha, nuevo id y sus participantes vacíos (Usar spread operator para el resto de las propiedades)
     */

    ponerEventoEnGira = (eventoId, nuevoLugar, nuevaFecha) => {
        const eventoIndex = this.eventos.findIndex(evento =>evento.id === eventoId)

        if(eventoIndex === -1){
            console.log(`Este evento no existe`)
            return
        }

        const nuevoEvento = {
            lugar: nuevoLugar,
            fecha: nuevaFecha,
            participantes: [],
            ...this.eventos
        }


    }
}

const manejadorEventos = new TicketManager()