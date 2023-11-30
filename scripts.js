let opcion = 0;
let products = [];

function seleccionOpcion(opcion) {
    opcionSeleccionada = opcion;
    document.getElementById('menu').style.display = 'none';
    document.getElementById('dataEntry').style.display = 'block';
    document.getElementById('displayData').style.display = 'none';
}

function obtenerDatosAdicionales() {
    const valorInput = document.getElementById('inputValor');
    const valor = parseFloat(valorInput.value);

    if (isNaN(valor) || valor <= 0) {
        mostrarMensaje('Ingrese un valor válido mayor que cero.');
        return;
    }

    const additionalData = document.getElementById('inputText').value.trim();
    if (additionalData === '') {
        mostrarMensaje('Ingrese información válida.');
        return;
    }

    const product = {
        valor: valor,
        cuota: calculadorCuotas(valor),
        marca: additionalData,
        tipo: getProductType(opcionSeleccionada)
    };

    products.push(product);

    console.log('Productos:', products);
    
    checkInput();
}

function calculadorCuotas(valor) {
    return parseFloat(valor * 0.10);
}

function getProductType(option) {
    const productTypes = {
        1: 'Auto',
        2: 'Moto',
        3: 'Notebook',
        4: 'Casa'
    };
    return productTypes[option];
}

function mostrarMensaje(message) {
    document.getElementById('message').innerHTML = message;
}

function mostrarDatos() {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `Tipo: ${product.tipo}, Marca: ${product.marca}, Valor: ${product.valor}, Cuota: ${product.cuota}`;
        dataList.appendChild(li);
    });
    document.getElementById('displayData').style.display = 'block';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('dataEntry').style.display = 'none';
}

function checkInput() {
    const inputText = document.getElementById('inputText').value.trim();
    if (inputText !== '') {
        mostrarDatos();
    }
}