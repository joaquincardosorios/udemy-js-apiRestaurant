/*
Alternativamente:
Se puede subir una base de datos local del archivo db.json, se debe tener instalado NodeJs y json-server
Ejecutar: json-server --watch db.json --port 4000
*/


let cliente = {
    mesa: '',
    hora:'',
    pedido: []
}

const categorias = {
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres'
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

    // Asignar datos de formulario a cliente
    cliente = {...cliente, mesa, hora}

    // Ocultar modal
    const modalFormulario = document.querySelector('#formulario');
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
    modalBootstrap.hide();

    // Mostrar secciones
    mostrarSecciones();

    // Obtener platillos de la API
    obtenerPlatillos();


}

function mostrarSecciones(){
    const seccionesOcultas = document.querySelectorAll('.d-none');
    seccionesOcultas.forEach( seccion => seccion.classList.remove('d-none'));
}

function obtenerPlatillos(){
    const url = 'https://64382121c1565cdd4d66ebc4.mockapi.io/api/v1/platillos';
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(platos => mostrarPlatillos(platos))
        .catch( error => console.log(error))
}

function mostrarPlatillos(platos){
    const contenido = document.querySelector('#platillos .contenido');

    platos.forEach(plato => {
        const row = document.createElement('DIV');
        row.classList.add('row', 'py-3', 'border-top');

        const nombre = document.createElement('DIV');
        nombre.classList.add('col-4');
        nombre.textContent = plato.nombre;

        const precio = document.createElement('DIV');
        precio.classList.add('col-3', 'fw-bold');
        precio.textContent = `$ ${plato.precio}` ;

        const categoria = document.createElement('DIV');
        categoria.classList.add('col-3');
        categoria.textContent = categorias[ plato.categoria ];

        const inputCantidad = document.createElement('INPUT');
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.id = `producto-${plato.id}`;
        inputCantidad.value = 0;
        inputCantidad.classList.add('form-control');

        // Funcion que detecta la cantidad y el platillo que se esta agregando
        inputCantidad.onchange = function() {
            const cantidad = parseInt( inputCantidad.value );
            agregarPlatillo({...plato, cantidad})
        };

        const agregar = document.createElement('DIV');
        agregar.classList.add('col-2');
        agregar.appendChild(inputCantidad)

        row.appendChild(nombre);
        row.appendChild(precio);
        row.appendChild(categoria);
        row.appendChild(agregar);

        contenido.appendChild(row);
    });
}

function agregarPlatillo(producto) {

    let { pedido } = cliente;
    // Revisar que la cantidad sea mayor a 0
    if(producto.cantidad > 0 ){

        // Comprueba que el articulo ya existe en el arreglo
        if(pedido.some(articulo => articulo.id === producto.id)){
            // El articulo existe, de actualiza la cantidad
            const pedidoActualizado = pedido.map(articulo => {
                if ( articulo.id === producto.id ){
                    articulo.cantidad = producto.cantidad;
                }
                return articulo;
            });
            // Se asigna nuevo arreglo a cliente.pedido
            cliente.pedido = [... pedidoActualizado];
        }
        else{
            // El articulo no exis,te se agrega el arreglo
            cliente.pedido = [...pedido, producto];
        }
        
    } else{
        // Eliminar elemneto cuando cantidad es igual a cero
        const pedidoActualizado = pedido.filter( articulo => articulo.id !== producto.id )
        cliente.pedido = [... pedidoActualizado];
    }

    console.log(cliente.pedido);
}