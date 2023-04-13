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

        // Verificar alerta
        const existeAlerta = document.querySelector('.invalid-feedback');

        if (!existeAlerta){
            const alerta = document.createElement('P');
            alerta.classList.add('invalid-feedback', 'd-block', 'text-center');
            alerta.textContent = 'Todos los campos son obligatorios';
            document.querySelector('.modal-body form').appendChild(alerta);
            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }
        return; 
    }
    console.log('todo bien');
}