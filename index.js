const dataset = [{
    'dimension': 'CLOSEUP',
    'soi': 49.07,
    'sod': 49.4,
    'yield': 0.39,
    'previous_data':[{
      'week_id': 'Week 33',
      'soi': 89.07,
      'sod': 53.4,
      'yield': 0.79
    },{
      'week_id': 'Week 34',
      'soi': 56.07,
      'sod': 43.4,
      'yield': 0.67
    },{
      'week_id': 'Week 35',
      'soi': 66.07,
      'sod': 43.4,
      'yield': 0.47
    },{
      'week_id': 'Week 38',
      'soi': 56.07,
      'sod': 43.4,
      'yield': 0.67
    }
    ]
},
{
    'dimension': 'INDOOR',
    'soi': 79.07,
    'sod': 59.4,
    'yield': 0.59,
    'previous_data':[{
      'week_id': 'Week 33',
      'soi': 89.07,
      'sod': 53.4,
      'yield': 0.79
    },{
      'week_id': 'Week 34',
      'soi': 56.07,
      'sod': 43.4,
      'yield': 0.67
    },{
      'week_id': 'Week 35',
      'soi': 66.07,
      'sod': 43.4,
      'yield': 0.47
    },{
      'week_id': 'Week 38',
      'soi': 56.07,
      'sod': 43.4,
      'yield': 0.67
    }]
},
{
    'dimension': 'MEDIUM',
    'soi': 129.07,
    'sod': 69.4,
    'yield': 0.34,
    'previous_data':[{
      'week_id': 'Week 33',
      'soi': 89.07,
      'sod': 53.4,
      'yield': 0.79
    },{
      'week_id': 'Week 34',
      'soi': 56.07,
      'sod': 43.4,
      'yield': 0.67
    },{
      'week_id': 'Week 35',
      'soi': 66.07,
      'sod': 43.4,
      'yield': 0.47
    },{
      'week_id': 'Week 38',
      'soi': 56.07,
      'sod': 43.4,
      'yield': 0.67
    }]
},
{
    'dimension': 'HIGH',
    'soi': 119.07,
    'sod': 79.4,
    'yield': 0.44,
    'previous_data':[{
      'week_id': 'Week 33',
      'soi': 89.07,
      'sod': 53.4,
      'yield': 0.79
    },{
      'week_id': 'Week 34',
      'soi': 56.07,
      'sod': 43.4,
      'yield': 0.67
    },{
      'week_id': 'Week 35',
      'soi': 66.07,
      'sod': 43.4,
      'yield': 0.47
    },{
      'week_id': 'Week 38',
      'soi': 56.07,
      'sod': 43.4,
      'yield': 0.67
    }]
}
]

const dimension = dataset.map( obj => {return obj.dimension})
const yieldPlotPoints = dataset.map( obj => {
    return obj.yield 
})
const yieldDataset = {
    'label' : 'Yield',
    'type' : 'line',
    'borderColor' : "#3e95cd",
    'yAxisID': 'right-y-axis',
    'data' : yieldPlotPoints,
    'fill' : false
}
const soiPlotPoints = dataset.map( obj => {
    return obj.soi
})
const soiDataset = {
    'label' : 'Share of Impression',
    'type' : 'bar',
    'yAxisID': 'left-y-axis',
    'backgroundColor' : "rgba(255,221,50,0.2)",
    'borderColor' : "rgba(255,221,50,1)",
    'borderWidth': 1,
    'data' : soiPlotPoints,
    // 'pointHoverRadius':15,
}
const sodPlotPoints = dataset.map( obj => {
    return obj.sod
})
const sodDataset = {
    'label' : 'Share of Duration',
    'type' : 'bar',
    'yAxisID': 'left-y-axis',
    'backgroundColor' : "rgba(193,46,12,0.2)",
    'borderColor' : "rgba(193,46,12,1)",
    'borderWidth': 1,
    'data' : sodPlotPoints,    
}

let hideBackButton = () =>{
  if(!backButtonVisible){
    document.getElementsByClassName('nav')[0].style.visibility = 'hidden';
    backButtonVisible = !backButtonVisible
  }
  else{
    document.getElementsByClassName('nav')[0].style.visibility = 'visible';
    backButtonVisible = !backButtonVisible
  }
}

let backButtonVisible = false

intialData = {
  'yieldDataset': yieldDataset,
  'soiDataset': soiDataset,
  'sodDataset': sodDataset,
  'hasChild':true,
  'dimensions': dimension
}

let myChart

hideBackButton();

let populateGraph = (data) =>{

  console.log('myChart: '+myChart);
  if(myChart !== undefined ){
    myChart.destroy();
  }
  myChart = new Chart(document.getElementById("mixed-chart"), {
    type: 'bar',
    data: {
      labels: data.dimensions,
      datasets: [data.yieldDataset, 
        data.soiDataset, data.sodDataset
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Locale Settings of Show',
        fontSize: 15,
        fontColor: 'white',
        fontFamily: 'Josefin Sans'
      },
     	onClick: function(e){
        if(data.hasChild){
          var element = this.getElementAtEvent(e);
          if(element.length > 0){            
              populateWeekGraph(element[0]._model.label) ;       
              
            }
          }
      },
      tooltips:{
        mode: 'label',
        backgroundColor: 'red'
      },
      scales:{xAxes: [{
            ticks: {
                fontSize: 13,
                fontColor: 'white',
                fontFamily: 'Josefin Sans',
            }
        }],
        yAxes: [{
            position : 'left',
            id: 'left-y-axis',
            type: 'linear',    
            scaleLabel: {
                display: true,
                labelString: 'SHARE',
                fontColor: 'white',
                fontFamily: 'Josefin Sans',
                fontSize: 12
              },
            gridLines: {
                display:false
            }
          },{
            position : 'right',
            id: 'right-y-axis',
            type: 'linear',
            scaleLabel: {
                display: true,
                labelString: 'YIELD',
                fontColor: 'white',
                fontFamily: 'Josefin Sans',
                fontSize: 12
              },
            gridLines: {
                display:false
            }
          }]
      }
    }
});

}

let populateWeekGraph = (slectedData) =>{
  console.log(slectedData);
  
  //display chart
  for (let index = 0; index < dataset.length; index++) {
    let prevData = null;
    if(dataset[index].dimension === slectedData){
      prevData = dataset[index].previous_data


      if(prevData.length >= 1){
        hideBackButton();
      
      const cDimension = prevData.map( obj => {return obj.week_id})
      const cYieldPlotPoints = prevData.map( obj => {
          return obj.yield 
      })
      const cYieldDataset = {
          'label' : 'Yield',
          'type' : 'line',
          'borderColor' : "#3e95cd",
          'yAxisID': 'right-y-axis',
          'data' : cYieldPlotPoints,
          'fill' : false
      }
      const cSoiPlotPoints = prevData.map( obj => {
          return obj.soi
      })
      const cSoiDataset = {
          'label' : 'Share of Impression',
          'type' : 'bar',
          'yAxisID': 'left-y-axis',
          'backgroundColor' : "rgba(255,221,50,0.2)",
          'borderColor' : "rgba(255,221,50,1)",
          'borderWidth': 1,
          'data' : cSoiPlotPoints,
          // 'pointHoverRadius':15,
      }
      const cSodPlotPoints = prevData.map( obj => {
          return obj.sod
      })
      const cSodDataset = {
          'label' : 'Share of Duration',
          'type' : 'bar',
          'yAxisID': 'left-y-axis',
          'backgroundColor' : "rgba(193,46,12,0.2)",
          'borderColor' : "rgba(193,46,12,1)",
          'borderWidth': 1,
          'data' : cSodPlotPoints,    
      }

      const cData = {
        'yieldDataset': cYieldDataset,
        'soiDataset': cSoiDataset,
        'sodDataset': cSodDataset,
        'hasChild':false,
        'dimensions': cDimension

      }
      populateGraph(cData)
      }
    }
  }
}

let loadInitialData= () =>{
  hideBackButton();
  populateGraph(intialData);

}
populateGraph(intialData);

