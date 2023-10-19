function menu(){
    let option = 0
    do{        
        option = parseInt(prompt("Bienvenido a cotizador de seguro\n\r Seleccione una opcion\r 1- Auto\n 2- Moto\n 3- Notebook\n 4- Casa"))
    }while(option == 0);
    return option;
}
function selectorProducto(option){
    let valor=0;
    switch(option){
        case 1:
            valor = parseInt(prompt("Ingrese el valor aproximado de su auto"))
            break;
        case 2:
            valor = parseInt(prompt("Ingrese el valor aproximado de su moto"))
            break;
        case 3:
            valor = parseInt(prompt("Ingrese el valor aproximado de su notebook"))
            break;
        case 4:
            valor = parseInt(prompt("Ingrese el valor aproximado de su casa"))
            break;
    }
    return valor;
}

function calculadorCuotas(valor){
    
    let cuota = parseInt(valor*0.10)    
    alert("El valor de su cuota mensual es de: "+cuota);
}

calculadorCuotas(selectorProducto(menu()))