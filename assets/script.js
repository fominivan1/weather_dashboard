var searchInput = document.querySelector('#searchBox')
var searchBtn = document.querySelector('.searchBtn')
var apiKey = '4f5be679139131f8d0a16600f2275b0a'
var forecast = document.querySelector('.forecast')

function weatherApi(e){
    e.preventDefault()
    var term = searchInput.value.toLowerCase()
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${term}&appid=${apiKey}`

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

            // render results for current city
            var chosenCity = document.querySelector('.chosenCity')
            var temp = document.querySelector('.temp')
            var wind = document.querySelector('.wind')
            var humid = document.querySelector('.humidity')
            var img = document.querySelector('.img')

            var unixDate = (data.dt) * 1000
            var dateString = moment(unixDate).format('MM/DD/YYYY')
            var tempK = data.main.temp
            var tempF = Math.round(1.8*(tempK-273)+32)
            var curCity = document.querySelector('.currentCity')
            curCity.classList.add('current')
            var icon = data.weather[0].icon
            var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png"
            img.setAttribute('src', iconUrl)
            windSpeed = Math.ceil(data.wind.speed * 2.23)

            chosenCity.textContent = data.name + ` (${dateString})`
            temp.textContent = 'Temp: ' + tempF + ' °F'
            wind.textContent = 'Wind: ' + windSpeed + ' MPH'
            humid.textContent = 'Humidity: ' + data.main.humidity + ' %'
        })
}

function forecastApi(e){
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
            console.log(data)
    })
}

function renderResults(data){
    var dayForecast = document.querySelector('.dayForecast')
    dayForecast.textContent = '5-Day Forecast:'

    for( var i = 7; i < data.list.length; i+=8){
        var card = document.createElement('div')
        var icon = data.list[i].weather[0].icon
        var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png"
        var tempinF = Math.round(1.8*(data.list[i].main.temp-273)+32)
        var unixDate = (data.list[i].dt) * 1000
        var dateString = moment(unixDate).format('MM/DD/YYYY')
        var windSpeed = Math.ceil(data.list[i].wind.speed * 2.23)
        var content = `
        <div class='card border-dark' id='cards'>
            <div>
                    <p class="date1">${dateString}</p>
                    <img src="${iconUrl}">
                    <p class="temp1">Temp: ${tempinF} °F</p>
                    <p class="wind1">Wind: ${windSpeed} MPH</p>
                    <p class="humid1">Humidity: ${data.list[i].main.humidity} %</p>
                </div>
            </div>` 
            card.innerHTML = content
            forecast.appendChild(card)
    }
}

searchBtn.addEventListener('click', weatherApi)
searchBtn.addEventListener('click', forecastApi)