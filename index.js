mapboxgl.accessToken = 'pk.eyJ1IjoianAtbWFwLXdvcmxkIiwiYSI6ImNreXBsb3RuZDBiNmYybm8xdnBtdXJwcDEifQ.ItJr1JjUfS4X0Ciz0ZHr3Q'

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/outdoors-v11',
  center: [0, 0],
  zoom: 1,
//   projection: 'naturalEarth'
})

const nav = new mapboxgl.NavigationControl()
map.addControl(nav, 'top-left')

function updates () {
  fetch('data.json')

    .then(res => res.json())

    .then((data) => {

      const countryData = data
      
      countryData.forEach(element => {

        console.log(element.countryInfo.lat)
        console.log(element.countryInfo.long)

        let color = ''
        if (element.todayCases < 1000) {
          color = 'rgb(108, 241, 241)'
        }
        else if (element.todayCases > 1000 && element.todayCases < 5000) {
          color = 'rgb(122, 245, 153)'
        }
        else if (element.todayCases > 5000 && element.todayCases < 10000) {
          color = 'rgb(71, 145, 206)'
        }
        else if (element.todayCases > 10000 && element.todayCases < 50000) {
          color = 'rgb(192, 56, 226)'
        }
        else if (element.todayCases > 50000) {
          color = 'rgb(228, 36, 36)'
        }
        const marker = new mapboxgl.Marker({
          color: color,
          draggable: false
        })
          .setLngLat([element.countryInfo.long, element.countryInfo.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<p>${element.country}</p>
          <p>Totel Cases : ${element.cases}</p>
          <p>Today Cases : ${element.todayCases}</p>
          <p>Totel Deaths : ${element.deaths}</p>
          <p>Today deaths : ${element.todayDeaths}</p> `))
          .addTo(map)
       
        
      })

      
    })
}

updates()
