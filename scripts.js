//Menu que devuelve una opcion en formato entero
function menu(){
    let option = 0
    do{        
        option = parseInt(prompt("Bienvenido a cotizador de seguro\n\r Seleccione una opcion\r 1- Auto\n 2- Moto\n 3- Notebook\n 4- Casa"))
        if(option < 1 || option > 4){
            option=0;
            alert("Debe elegir una opcion correcta")            
        }
    }while(option == 0);
    return option;
}

//se calcula el valor de la cuota calculando el 10% del valor total
function calculadorCuotas(valor){    
    let cuota = parseFloat(valor*0.10) 
    return cuota;       
}
//Se obtiene el valor del producto dependiendo de la opcion
function selectorProducto(option){
    let cuotas = [];
    switch(option){
        case 1:      
            const car = {marca:"auto", valor:0, cuota:0.0};      
            let marca = prompt("Ingrese la marca de su auto")
            valor = parseFloat(prompt("Ingrese el valor aproximado de su auto"))
            car.marca = marca
            car.valor = valor
            car.cuota = calculadorCuotas(valor)
            console.log("El valor de la cuota es: ",  car.cuota)
            cuotas.push(car.cuota)
            break;                      
        case 2:
            const moto = {tipo:"moto", valor:0, cuota:0.0};      
            let tipo = prompt("Ingrese la marca de su moto")
            valor = parseFloat(prompt("Ingrese el valor aproximado de su moto"))
            moto.tipo = tipo
            moto.valor = valor 
            moto.cuota = calculadorCuotas(valor)    
            console.log("El valor de la cuota es: ",  moto.cuota)
            cuotas.push(moto.cuota)
            break;
        case 3:
            const notebook = {modelo:"moto", valor:0, cuota:0.0};      
            let modelo = prompt("Ingrese la marca de su notebook")
            valor = parseFloat(prompt("Ingrese el valor aproximado de su notebook"))
            notebook.modelo = modelo
            notebook.valor = valor   
            notebook.cuota = calculadorCuotas(valor) 
            console.log("El valor de la cuota es: ",  notebook.cuota)   
            cuotas.push(notebook.cuota)
            break;
        case 4:
            const casa = {direccion:"direccion", valor:0, cuota:0.0};      
            let direccion = prompt("Ingrese su direccion")
            valor = parseFloat(prompt("Ingrese el valor aproximado de su casa"))
            casa.direccion = direccion
            casa.valor = valor 
            casa.cuota = calculadorCuotas(valor)
            console.log("El valor de la cuota es: ",  casa.cuota)
            cuotas.push(casa.cuota)
            break;
    }   
    return cuotas
}

let mis_cuotas = selectorProducto(menu());
let total = 0
for(let i=0; i < mis_cuotas.length ; i++){
    total = total + parseInt(mis_cuotas[i])
}
console.log("La suma de tus cuotas es: ", total)




