var searchInput = document.querySelector('#searchBox')
var searchBtn = document.querySelector('.searchBtn')

function searchHandler(e){
    e.preventDefault()
    var term = searchInput.value.toLowerCase()
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + term + '&limit=1&appid=77405a385bebafa9f315f727dbdd5471'
    fetch(apiUrl)
}

searchBtn.addEventListener('click', searchHandler)

console.log(searchHandler)