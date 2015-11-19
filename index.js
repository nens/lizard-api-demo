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
  var data = buildData(response.results[0])
  Chart(ctx).line(data, chartOptions)
}

function getTS (e) {
  if (e.keyCode !== 13) {
    return
  }

  var url = tsElement.value + '&format=json'

  fetch(url)
    .then(putDataOnChart)
    .catch(function (error) {
      window.alert(error.message)
    })
}

tsElement.addEventListener('keydown', getTS, false)

