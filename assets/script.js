var searchInput = document.querySelector('#searchBox')
var searchBtn = document.querySelector('.searchBtn')
var apiKey = '4f5be679139131f8d0a16600f2275b0a'

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
            console.log(data)
    })
}


function renderResults(data){
    var chosenCity = document.querySelector('.chosenCity')
    var temp = document.querySelector('.temp')
    var wind = document.querySelector('.wind')
    var humid = document.querySelector('.humidity')
    var tempK = data.list[0].main.temp
    var tempF = Math.round(1.8*(tempK-273)+32)
    

    chosenCity.textContent = data.city.name
    temp.textContent = 'Temp: ' + tempF
    wind.textContent = 'Wind: ' + data.list[0].wind.speed + ' MPH'
    humid.textContent = 'Humidity: ' + data.list[0].main.humidity + ' %'
}

searchBtn.addEventListener('click', searchHandler)