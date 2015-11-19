var Chart = require('chartjs')
var fetch = window.fetch

var ctx = document.getElementById('prettychart').getContext('2d')
var tsElement = document.getElementById('timeseries')

var chartOptions = {

}

function buildData (response) {
  var chartData = {
    datasets: [{
      label: response.name,
      data: response.data
    }
   ]
  }
  return chartData
}

function putDataOnChart (response) {
  var data = buildData(response)
  Chart(ctx).line(data, chartOptions)
}

function getFromInput (e) {
  if (e.keyCode !== 13) {
    return
  }

  var url = tsElement.value + '&format=json'
  
  getTS(url)
}

function getTS(url) {
  fetch(url)
    .then(putDataOnChart)
    .catch(function (error) {
      throw error
    })
}

function getExample() {
  console.log('hahahah')
  getTS('https://demo.lizard.net/api/v2/timeseries/296ea3a4-fcd6-4c8e-9c4d-9c2a2cd20076/?end=1447936338553&min_points=320&start=1447692300992')
}

tsElement.addEventListener('keydown', getFromInput, false)
document.getElementById('voorbeeld').addEventListener('click', getExample, false)
