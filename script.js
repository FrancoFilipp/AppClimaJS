let real_data
let latitude
let longitude
let key
let url

window.addEventListener('load', ()=>{ //cuando termine de cargar
   request_api()
})

function request_api() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {

            latitude = position.coords.latitude
            longitude = position.coords.longitude
            key = '01549af9154dcde25bf4becd56ee742e'

            url = `https://api.openweathermap.org/data/2.5/weather?lang=es&lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`
            //console.log(url)

            fetch(url).then(response => {
                return response.json()
            }).then(data => {
                real_data = data
                modificar_datos(real_data)

            }).catch(error => {console.log(error)})

        })
    }
}

function modificar_datos(data) {

    let temperatureValue = document.getElementById('temperatura-valor')
    let temperatureDesc = document.getElementById('temperatura-descripcion')

    let location_ = document.getElementById('ubicacion')
    let animatedIcon = document.getElementById('icono-animado')

    let windVelocity = document.getElementById('velocidad-viento')
    console.log(data)
    console.log(Object.getOwnPropertyNames(data))
    let temp = Math.round(data.main.temp)
    temperatureValue.textContent = `${temp}°C`
    let descr = data.weather[0].description
    temperatureDesc.textContent = descr.toUpperCase()

    location_.textContent = data.name

    windVelocity.textContent = `${data.wind.speed} m/s`

    switch (data.weather[0].main) {
        case 'Thunderstorm':
            animatedIcon.src = 'animated/thunder.svg'
            console.log('TORMENTA');
            break;
        case 'Drizzle':
            animatedIcon.src = 'animated/rainy-2.svg'
            console.log('LLOVIZNA');
            break;
        case 'Rain':
            animatedIcon.src = 'animated/rainy-7.svg'
            console.log('LLUVIA');
            break;
        case 'Snow':
            animatedIcon.src = 'animated/snowy-6.svg'
            console.log('NIEVE');
            break;
        case 'Clear':
            animatedIcon.src = 'animated/day.svg'
            console.log('LIMPIO');
            break;
        case 'Atmosphere':
            animatedIcon.src = 'animated/weather.svg'
            console.log('ATMOSFERA');
            break;
        case 'Clouds':
            animatedIcon.src = 'animated/cloudy-day-1.svg'
            console.log('NUBES');
            break;
        default:
            animatedIcon.src = 'animated/cloudy-day-1.svg'
            console.log('por defecto');
    }

}

function modify_elem(id_elem) {
    console.log('meclickearon')
    let aux = `<div id="caja1" onClick="modify_elem('caja1')"> <h1 id="temperatura-valor"></h1> <h1 id="temperatura-descripcion"></h1> </div>`
    console.log(aux)
    document.getElementById(id_elem).outerHTML = aux
    modificar_datos(real_data)
}
