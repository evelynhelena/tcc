import React from 'react'
import ChartistGraph from 'react-chartist';
import "./ChartistGraphStyle.css";

function ChartistGraphComponenente(props) {
    var data = {
        labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        series: [
          props.series
        ]
      };
  
      var options = {
        high: 50,
        low: 0,
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
      };
    return (
        <div>
            <ChartistGraph 
            className="ct-chart" 
            data={data} 
            options={options} 
            type={props.typeGraphic} />
        </div>
    )
}

export default ChartistGraphComponenente
