var searchInput = document.querySelector('#searchBox')
var searchBtn = document.querySelector('.searchBtn')
var apiKey = '4f5be679139131f8d0a16600f2275b0a'
var forecast = document.querySelector('.forecast')

function searchHandler(e){
    e.preventDefault()
    var term = searchInput.value.toLowerCase()
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${term}&appid=${apiKey}`

    fetch(apiUrl)
        .then(function(response){
            if (response.ok){
                searchInput.value = ''
                return response.json()
            }
            alert('That does not exist!!')
            return null
    })
        .then(function(data){
            if(!data){
                return
            }
            renderResults(data)
    })
}


function renderResults(data){
    var getDate = moment().format('MM/DD/YYYY')
    var chosenCity = document.querySelector('.chosenCity')
    var temp = document.querySelector('.temp')
    var wind = document.querySelector('.wind')
    var humid = document.querySelector('.humidity')
    var tempK = data.list[0].main.temp
    var tempF = Math.round(1.8*(tempK-273)+32)

    var dayForecast = document.querySelector('.dayForecast')

    chosenCity.textContent = data.city.name + ` (${getDate})`
    temp.textContent = 'Temp: ' + tempF
    wind.textContent = 'Wind: ' + data.list[0].wind.speed + ' MPH'
    humid.textContent = 'Humidity: ' + data.list[0].main.humidity + ' %'

    dayForecast.textContent = '5-Day Forecast:'

    console.log(data)

    for( var i = 7; i < data.list.length; i+=8){
        var card = document.createElement('div')
        var tempinF = Math.round(1.8*(data.list[i].main.temp-273)+32)
        var unixDate = (data.list[i].dt) * 1000
        var dateString = moment(unixDate).format('MM/DD/YYYY')
        var content = `
        <div class='card border-dark' id='cards'>
            <div>
                    <p class="date1">${dateString}</p>
                    <p class="temp1">Temp: ${tempinF} °F</p>
                    <p class="wind1">Wind: ${data.list[i].wind.speed} MPH</p>
                    <p class="humid1">Humidity: ${data.list[i].main.humidity} %</p>
                </div>
            </div>` 
            card.innerHTML = content
            forecast.appendChild(card)
    }
}

searchBtn.addEventListener('click', searchHandler)