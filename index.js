var tsElement = document.getElementById('timeseries')

var chartOptions = {

}
var chart;

function buildData (response) {
  var chartData = {
    labels: response.events.map(function (item) {
      return item.timestamp
    }),
    series: [
      response.events.map(function (item) {
       return item.min
      })
    ],
  }
  return chartData
}



function putDataOnChart (response) {
  var data = buildData(response)
  chart = new Chartist.Line('#prettychart', data, {
    fullWidth: true,
    chartPadding: {
      right: 20
    }
  })

}

function getFromInput (e) {
  if (e.keyCode !== 13) {
    return
  }

  var url = tsElement.value  
  getTS(url)
}

function getTS(url) {
  url = url + '&format=json'
  fetch(url)
    .then(function (response) {
      return response.json()
    }).then(putDataOnChart)
    .catch(function (error) {
      throw error
    })
}

function getExample() {
  console.log('hahahah')
  getTS('https://demo.lizard.net/api/v2/timeseries/296ea3a4-fcd6-4c8e-9c4d-9c2a2cd20076/?end=1447936338553&min_points=320&start=1347692300992')
}

tsElement.addEventListener('keydown', getFromInput, false)
document.getElementById('voorbeeld').addEventListener('click', getExample, false)
