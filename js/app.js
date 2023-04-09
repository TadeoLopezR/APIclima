const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load',()=>{
    formulario.addEventListener('submit',buscarClima)
})

function buscarClima(e) {
    e.preventDefault()

    //Validar
    const ciudad= document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad===''||pais===''){
        mostrarError('Ambos campos son obligatorios');
        return
    }
    //Consultar API
    consultarAPI(ciudad,pais);


}


function mostrarError(mensaje) {

    const alerta= document.querySelector('.bg-red-100')

    if(!alerta){
        // Crear alerta
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative", "max-w-md", "mx-auto", "mt-6", "text-center" );

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove()
        }, 4000);
    }

}

function consultarAPI(ciudad,pais) {
    const appID = 'e0e24d2b45604915277f7438271f20e8'
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}&units=metric`
    
    
    spinner()//Muestra espinner de carga
    
    fetch(url)
        .then(respuesta=> respuesta.json())
        .then(dato=>{
            limpiarHtml()
            if (dato.cod==="404") {
                mostrarError('La ciudad no existe..')
                return;
            }
            // Imprime clima 
            mostrarClima(dato);
        })
    
}

//&units=metric
function mostrarClima(dato) {
    const{name,main:{temp, temp_max, temp_min}}=dato;
    
    const nombreCiudad = document.createElement('P')
    nombreCiudad.textContent=`Clima en ${name}`
    nombreCiudad.classList.add('font-bold','text-2xl');
   
    const actual = document.createElement('P')
    actual.innerHTML=`${temp} &#8451 `
    actual.classList.add('font-bold','text-6xl');

    const tempMaxima = document.createElement('P')
    tempMaxima.innerHTML=`Max: ${temp_max} &#8451`
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('P')
    tempMinima.innerHTML=`Min: ${temp_min} &#8451`
    tempMinima.classList.add('text-xl');

    const resultadoDiv= document.createElement('DIV');
    resultadoDiv.classList.add('text-center','text-white');
    
    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(tempMaxima)
    resultadoDiv.appendChild(tempMinima)

    resultado.appendChild(resultadoDiv)
}

function limpiarHtml() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner() {

    limpiarHtml()
    
    const divSpinner = document.createElement('Div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML=`
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
   `
   resultado.appendChild(divSpinner)
}