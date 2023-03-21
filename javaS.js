//herramientas
let i=0;
let textColorSun = "#06s2c69";
let textColorCloud = "#8edee9";
let bgColorCloud = "#615F5D";
let bgClear = "#8edee9";

let input = document.getElementById('search_Input');
let form = document.getElementById('form');
let caja1 = document.getElementById('caja1');

//datos para la API
const api = {
    key: `7576f73fd61387e1eef1dd6420dbbdb0`,
    url: `https://api.openweathermap.org/data/2.5/weather`
}
let lon;
let lat;
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


//datos para la tarjeta del clima
let temperatura_Valor = document.getElementById('temperatura-valor');
let temperatura_Descripcion = document.getElementById('temperatura-descripcion');
let ubicacion = document.getElementById('ubicacion');
let iconoAnimado = document.getElementById('icono-Animado');
let Velocidad_Viento = document.getElementById('viento-Velocidad');
let vel_Viento = document.createElement("span");
Velocidad_Viento.appendChild(vel_Viento);
//fondo versatil
let video_Box = document.getElementById('video_Box');
let video_Bg = document.getElementById('video_Bg');
let array_Bg_Day_Clear = "../img/day/clear/Dclear1.mp4";
let array_Bg_Day_Cloud = ['../img/day/cloud/Dcloud1.mp4', '../img/day/cloud/Dcloud2.mp4'];
let array_Bg_Day_Rain = ["../img/day/rain/Drain1.mp4", "../img/day/rain/Drain2.mp4", "../img/day/rain/Drain3.mp4"];
let array_Bg_Day_Snow = ["../img/day/snow/Dsnow1.mp4", "../img/day/snow/Dsnow2.mp4"];


let array_Bg_Night_Clear = "../img/night/clear/Nclear1.mp4";
let array_Bg_Night_Cloud = ['../img/night/cloud/Ncloud1.mp4'];
let array_Bg_Night_Rain = ["../img/night/rain/Nrain1.mp4"];
let array_Bg_Night_Snow = ["../img/night/snow/Nsnow1.mp4", "../img/night/snow/Nsnow2.mp4"]


//user time
let h;
let s;
let m;


function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
}


if(navigator.geolocation){
    //obtener la posicion del usuario
    navigator.geolocation.getCurrentPosition( position => {
        lon = position.coords.longitude
        lat = position.coords.latitude
        const url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=metric&lon=${lon}&appid=7576f73fd61387e1eef1dd6420dbbdb0`;
        fetch(url1)
        .then( response =>{return response.json()})
        .then(data => {
            card(data);
            const hour2 = new Date();
            const offset = hour2.getHours();
            bgWeather(data, offset);
        })
    })
}else{


    console.log("permision denegated");



}














function card(data){
    //colocar en pantalla los tados del clima
    let icono = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    temperatura_Valor.textContent = Math.round(data.main.temp) + "°C";
    temperatura_Descripcion.textContent = data.weather[0].main;
    vel_Viento.textContent = data.wind.speed;
    vel_Viento.textContent += "Humedad " + data.main.humidity;
    ubicacion.textContent = data.name;
    iconoAnimado.src = `${icono}`;
    //datos pasa saber la zona horaria del lugar que se desea buscar
    lon = data.coord.lon;
    lat = data.coord.lat;
    console.log(data);


}

function bgWeather(data, h){
    let timeSet;
   
    if( (h>6) && (h<20) ){
        timeSet = 1;
        
        switch(data.weather[0].main){
            case 'Clear':
                video_Box.src = array_Bg_Day_Clear;
                input.style.borderBottom = "1px solid" +  textColorSun;
                console.log(video_Box.src);
                break;
            case 'Clouds':
                video_Box.src = array_Bg_Day_Cloud[ Math.round( Math.random() * ( array_Bg_Day_Cloud.length  - 1 ) )]; //Math.round(Math.random() * array_Bg_Day_Cloud.length) 
                input.style.borderBottom = "1px solid " + textColorSun + "";
                document.body.style.color = textColorCloud;
                input.style.color = textColorCloud;
                console.log(video_Box.src);
                break;
            case 'Rain':    
                video_Box.src = array_Bg_Day_Rain[ Math.round( Math.random() * ( array_Bg_Day_Cloud.length  - 1 ) )];
                input.style.borderBottom = "1px solid" +  textColorSun;
                console.log(video_Box.src);
                break;
            case 'Snow':
                video_Box.src = array_Bg_Day_Snow[ Math.round( Math.random() * ( array_Bg_Day_Snow.length  - 1 ) )];
                console.log(video_Box.src);
                break;
            default:
                console.log("error BG");
        }
    }


    if( (h<6) || (h>20) ){
        timeSet = 0;
        switch(data.weather[0].main){
            case 'Clear':
                video_Box.src = array_Bg_Night_Clear;
                input.style.borderBottom = "1px solid" +  textColorCloud;
                document.body.style.color = textColorCloud;
                input.style.color = textColorCloud;
                console.log(video_Box.src);
                caja1.style["boxShadow"] = `0 0px 10px 1px ${textColorCloud},
                                            0 0px 10px 1px ${textColorCloud}`;
                break;
            case 'Clouds':
                video_Box.src = array_Bg_Night_Cloud; //Math.round(Math.random() * array_Bg_Day_Cloud.length) 
                input.style.borderBottom = "1px solid " + textColorCloud + "";
                document.body.style.color = textColorCloud;
                input.style.color = textColorCloud;
                console.log(video_Box.src);
                caja1.style["boxShadow"] = `0 0px 10px 1px ${textColorCloud},
                                            0 0px 10px 1px ${textColorCloud}`;
                break;
            case 'Rain':    
                video_Box.src = array_Bg_Night_Rain;
                input.style.borderBottom = "1px solid" +  textColorCloud;
                document.body.style.color = textColorCloud;
                input.style.color = textColorCloud;
                console.log(video_Box.src);
                caja1.style["boxShadow"] = `0 0px 10px 1px ${textColorCloud},
                                            0 0px 10px 1px ${textColorCloud}`;
                break;
            case 'Snow':
                video_Box.src = array_Bg_Night_Snow[ Math.round( Math.random() * ( array_Bg_Night_Snow.length  - 1 ) )];
                document.body.style.color = textColorCloud;
                input.style.color = textColorCloud;
                console.log(video_Box.src);
                caja1.style["boxShadow"] = `0 0px 10px 1px ${textColorCloud},
                                            0 0px 10px 1px ${textColorCloud}`;
                break;
            default:
                console.log("error BG");
        }
    }


}


async function search(query){
    //busqueda del clima de una ciudad
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&lang=es&appid=7576f73fd61387e1eef1dd6420dbbdb0`);
        const inf = await response.json();
        lon = inf.coord.lon;
        lat = inf.coord.lat;
        console.log("")
        console.log("")
        timeUser(lon, lat, inf);
        card(inf);


    } catch(err){
        console.log('hubo un error');
        alert("error2");
    }
}



async function timeUser(lon, lat, data){
    
    var time;
    let userTimeZone;
    let h;
    let s;
    let m;
    const api2 = "e98b756b843b40d6a3763bf092af824c";
    const url2 = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&formatJson&apiKey=${api2}`;
    const response2 = await fetch(url2);
    const inf2 = await response2.json();
    console.log(inf2);
    console.log(data);


    userTimeZone = parseInt(inf2.features[0].properties.timezone.offset_STD);
    //cuenta para sacar la diff horaria
    const d = new Date();
    h = addZero(d.getUTCHours());
    h = parseInt(h);
    h = h + userTimeZone;
    m = addZero(d.getUTCMinutes());
    s = addZero(d.getUTCSeconds());
    time = h + ":" + m + ":" + s;
    //corrige errores para que no te salga:ej 32 hs o -7hs
    if(h>24){                
        h = h - 24;
        console.log(h);
        time = h + ":" + m + ":" + s;                
    }else if(h<0){
        h = h + 24;
        console.log(h);
        time = h + ":" + m + ":" + s;
    }
    
    bgWeather(data, h);
    return h;
}

        



function onSubmit(event){
    

    event.preventDefault();
    search(input.value);
}





form.addEventListener('submit', onSubmit, true);

