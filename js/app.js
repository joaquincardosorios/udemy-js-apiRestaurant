let cliente = {
    mesa: '',
    hora:'',
    pedido: []
}

const btnGuardarCliente = document.querySelector('#guardar-cliente')
btnGuardarCliente.addEventListener('click', guardarCliente)


function guardarCliente() {
    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;

    // Validar datos
    if ([ mesa, hora ].some( campo => campo === '')){
        console.log('alguno vacio')
    } else{
        console.log('todo bien')
    }
}