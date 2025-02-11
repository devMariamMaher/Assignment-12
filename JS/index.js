"use strict"

let searchInput = document.querySelector('#searchInput');
let errorMessage = document.querySelector('.errorMessage');
let row = document.querySelector('.row');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


async function fetchTemp(searchQ){
    try{
        let tempRequest = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7fe3ebf6f314444a8f324144241612&q=${searchQ}&days=3`);
        let tempResponse = await tempRequest.json();
        
        while (row.firstChild) {
            row.removeChild(row.lastChild);
        }
        
        displayCurrent(tempResponse);
        displayFutureDays(tempResponse.forecast);

        errorMessage.classList.add('d-none');
    } catch{
        errorMessage.textContent = 'Country does not exist';
        errorMessage.classList.remove('d-none');
    }
}


// async function getCountry(){
//     const success = async (pos) => {
//         let coords = pos.coords;
//         let lat = coords.latitude
//         let long = coords.longitude
        
//         let countryRequest = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=53f3b304f1484eff93dab34c2e52ec51`);
//         let countryResponse = await countryRequest.json();
//         let state = countryResponse.results[0].components.state;
//         fetchTemp(state);

//         errorMessage.classList.add('d-none');
//     }
    

//     const error = () => {
//         errorMessage.textContent = 'Location is disabled';
//         errorMessage.classList.remove('d-none');
//     }
    
//     navigator.geolocation.getCurrentPosition(success, error);
// }


(() => {
    // getCountry()
    fetchTemp('cairo')
})()


searchInput.addEventListener('input', () => {
    if(searchInput.value.length >= 3){
        fetchTemp(searchInput.value)
    } else{
        getCountry();
    }
})


function displayCurrent(currentData){
    let d = new Date();
    let day = days[d.getDay()];

    let dDate = new Date();
    var todayDate = dDate.getDate();

    let m = new Date();
    let month = months[m.getMonth()];


    let colDiv = document.createElement('div');
    colDiv.classList.add('col-12', 'col-lg-4', 'eachCard');

    let weatherDiv = document.createElement('div');
    weatherDiv.classList.add('weatherCard');

    let cardHeader = document.createElement('div');
    cardHeader.classList.add('cardHeader', 'd-flex', 'justify-content-between');
    
    let daySpan = document.createElement('span');
    daySpan.textContent = day;
    
    let dateSpan = document.createElement('span');
    dateSpan.textContent = todayDate + ' ' + month;

    let cardBody = document.createElement('div');
    cardBody.classList.add('cardBody', 'p-4');

    let locHeader = document.createElement('h3');
    locHeader.textContent = currentData.location.name;

    let tempP = document.createElement('p');
    let tempUnite = document.createTextNode(`${currentData.current.temp_c}`);
    let deg = document.createElement('sup');
    deg.textContent = 'o';
    let unite = document.createElement('span');
    unite.textContent = `C`;
    unite.style.fontSize = '5.625rem';
    tempP.classList.add('temp');
    tempP.append(tempUnite, deg, unite);

    let weatherIcon = document.createElement('div');
    let iconImg = document.createElement('img');
    iconImg.setAttribute('src', `https:${currentData.current.condition.icon}`);
    weatherIcon.classList.add('weatherIcon');
    weatherIcon.style.width = '28%';
    weatherIcon.append(iconImg);

    let weatherStatus = document.createElement('p');
    weatherStatus.textContent = currentData.current.condition.text;

    let cardIconsDiv = document.createElement('div');
    cardIconsDiv.classList.add('cardIcons', 'd-flex', 'gap-3');

    let icon1Span = document.createElement('span');
    let icon1 = document.createElement('i');
    icon1.classList.add('fa-solid', 'fa-umbrella');
    let icon1SpanText = document.createTextNode(' 20%');
    icon1Span.append(icon1, icon1SpanText);
    
    let icon2Span = document.createElement('span');
    let icon2 = document.createElement('i');
    icon2.classList.add('fa-solid', 'fa-wind');
    let icon2SpanText = document.createTextNode(' 18km/h');
    icon2Span.append(icon2, icon2SpanText);
    
    let icon3Span = document.createElement('span');
    let icon3 = document.createElement('i');
    icon3.classList.add('fa-solid', 'fa-compass');
    let icon3SpanText = document.createTextNode(' East');
    icon3Span.append(icon3, icon3SpanText);

    cardIconsDiv.append(icon1Span, icon2Span, icon3Span);
    cardBody.append(locHeader, tempP, weatherIcon, weatherStatus, cardIconsDiv);
    cardHeader.append(daySpan, dateSpan);
    weatherDiv.append(cardHeader, cardBody);
    colDiv.append(weatherDiv);
    row.append(colDiv);
}


function displayFutureDays(futureData){
    for(let i = 1; i < futureData.forecastday.length; i++){
        let d = new Date(futureData.forecastday[i].date);
        let day = days[d.getDay()]
    
    
        let colDiv = document.createElement('div');
        colDiv.classList.add('col-12', 'col-lg-4', 'eachCard');

        let weatherCard = document.createElement('div');
        weatherCard.classList.add('weatherCard');

        let cardHeader = document.createElement('div');
        cardHeader.classList.add('cardHeader', 'd-flex', 'justify-content-center');
        
        let daySpan = document.createElement('span');
        daySpan.textContent = day;

        let cardBody = document.createElement('div');
        cardBody.classList.add('cardBody', 'p-4', 'text-center');

        let weatherIcon = document.createElement('div');
        weatherIcon.classList.add('weatherIcon', 'mx-auto');
        weatherIcon.style.width = '28%'

        let iconImg = document.createElement('img');
        iconImg.setAttribute('src', `https:${futureData.forecastday[i].day.condition.icon}`);

        weatherIcon.append(iconImg);

        let maxTemp = document.createElement('p');
        let maxTempUnite = document.createTextNode(`${futureData.forecastday[i].day.maxtemp_c}`);
        maxTemp.style.fontSize = '1.5rem';
        maxTemp.style.fontWeight = '700';
        maxTemp.style.marginBottom = '0';
        let maxDeg = document.createElement('sup');
        maxDeg.textContent = 'o';
        let unite = document.createElement('span');
        unite.textContent = 'C';
        unite.style.fontSize = '1.5rem';
        maxTemp.append(maxTempUnite, maxDeg, unite);

        let minTemp = document.createElement('p');
        let minTempUnite = document.createTextNode(`${futureData.forecastday[i].day.mintemp_c}`);
        let minDeg = document.createElement('sup');
        minDeg.textContent = 'o';
        minTemp.style.color = 'var(--card-text-color)';
        minTemp.append(minTempUnite, minDeg);
        
        let weatherStatus = document.createElement('p');
        weatherStatus.textContent = futureData.forecastday[i].day.condition.text;

        cardBody.append(weatherIcon, maxTemp, minTemp, weatherStatus);
        cardHeader.append(daySpan);
        weatherCard.append(cardHeader, cardBody);
        colDiv.append(weatherCard);
        row.append(colDiv);
    }
}