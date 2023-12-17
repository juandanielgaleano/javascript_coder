let opcionSeleccionada = 0;
let products = [];

window.onload = function() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
        mostrarDatos();
    }
};

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

    convertirACuotaUSD(product.cuota)
        .then(convertedCuota => {
            product.cuotaUSD = convertedCuota;
            localStorage.setItem('products', JSON.stringify(products));
            console.log('Productos:', products);
            checkInput();
            mostrarDatos(); 
        })
        .catch(error => console.error('Error:', error));
}

function convertirACuotaUSD() {
    const apiKey = '3ea74b465eb6bed2c270be44'; 
    const apiUrl = `https://v6.exchangerate-api.com/v6/3ea74b465eb6bed2c270be44/latest/ARS`;

    return fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch exchange rates');
        }
        return response.json();
    })
    .then(data => {
        const exchangeRate = data.conversion_rates.USD; 
        if (!isNaN(exchangeRate)) {
            return exchangeRate; 
        } else {
            throw new Error('Invalid exchange rate');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return 'Conversion Error';
    });
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

function editarProducto(index) {
    const dataList = document.getElementById('dataList');
    const listItem = dataList.childNodes[index];

    const newValueInput = document.createElement('input');
    newValueInput.type = 'number';
    newValueInput.placeholder = 'Nuevo valor';
    newValueInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const newValue = parseFloat(newValueInput.value);
            if (!isNaN(newValue) && newValue > 0) {
                products[index].valor = newValue;
                products[index].cuota = calculadorCuotas(newValue);
                localStorage.setItem('products', JSON.stringify(products));
                mostrarDatos();
            } else {
                alert('Ingrese un valor válido mayor que cero.');
            }
        }
    });

    listItem.appendChild(newValueInput);
    newValueInput.focus();
}

function eliminarProducto(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    mostrarDatos();
}

function mostrarDatos() {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = '';

    products.forEach((product, index) => {
        const li = document.createElement('li');
        li.textContent = `Tipo: ${product.tipo}, Marca: ${product.marca}, Valor: ${product.valor}, Cuota: ${product.cuota}, Cuota USD: ${product.cuotaUSD || 'No disponible'}`;
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => editarProducto(index);
        li.appendChild(editButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => eliminarProducto(index);
        li.appendChild(deleteButton);

        dataList.appendChild(li);
    });

    document.getElementById('displayData').style.display = 'block';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('dataEntry').style.display = 'none';
}