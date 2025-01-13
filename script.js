const urlBase = `https://api.openweathermap.org/data/2.5/find`;
const API_KEY = '3cf6ea6f4ebf6c6f467fcbb695a5561e';//aca va el api key que generamos 
const units = "metric";

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeather(city);
    } else {
        alert('Ingrese una ciudad válida');
    }
});

document.getElementById("clear").addEventListener("click", () => {
    document.getElementById("cityInput").value = "";
    document.getElementById('responseData').innerHTML = '';
})

function fetchWeather(city) {
    fetch(`${urlBase}?q=${city}&units=${units}&appid=${API_KEY}&lang=es`)
        .then(data => data.json())
        .then(data => processCityResults(data))
        .catch(error => console.error('Error al obtener datos:', error));
}

function processCityResults(data) {
    //console.log(data);
    const divResponseData = document.getElementById('responseData');
    divResponseData.innerHTML = '';

    if (data.count === 0) {
        divResponseData.textContent = 'No se encontraron resultados para esa búsqueda.';
        return;
    }

    if (data.count === 1) {
        // Si hay una sola coincidencia, mostrar directamente los detalles
        showWeatherDetails(data.list[0]);
    } else {
        // Si hay múltiples coincidencias, mostrar opciones al usuario
        showCityOptions(data.list);
    }
}

function showCityOptions(cities) {
    const divResponseData = document.getElementById('responseData');
    divResponseData.innerHTML = '';

    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = '0';

    cities.forEach(city => {
        const listItem = document.createElement('li');
        listItem.textContent = `${city.name}, ${city.sys.country}`;
        listItem.style.cursor = 'pointer';
        listItem.style.margin = '10px 0';
        listItem.style.color = '#00aaff';
        listItem.style.fontWeight = 'bold';

        listItem.addEventListener('click', () => {
            showWeatherDetails(city);
        });

        list.appendChild(listItem);
    });

    divResponseData.appendChild(list);
}

function showWeatherDetails(city) {
    const divResponseData = document.getElementById('responseData');
    divResponseData.innerHTML = '';

    const cityInfo = document.createElement('h2');
    cityInfo.textContent = `${city.name}, ${city.sys.country}`;

    const tempInfo = document.createElement('p');
    tempInfo.textContent = `La temperatura es: ${Math.floor(city.main.temp)}ºC`;

    const humidityInfo = document.createElement('p');
    humidityInfo.textContent = `La humedad es del ${city.main.humidity}%`;

    const icoInfo = document.createElement('img');
    icoInfo.src = `https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`;

    const descriptionInfo = document.createElement('p');
    descriptionInfo.textContent = `La descripción meteorológica es ${city.weather[0].description}`;

    divResponseData.appendChild(cityInfo);
    divResponseData.appendChild(tempInfo);
    divResponseData.appendChild(humidityInfo);
    divResponseData.appendChild(icoInfo);
    divResponseData.appendChild(descriptionInfo);
}
