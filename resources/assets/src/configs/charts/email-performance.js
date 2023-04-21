const chart = {
  "type": "scatter",
  "options": {
    "responsive":true,
    "maintainAspectRatio":false,
    "devicePixelRatio":4,
    "layout": {
      "padding": {
        "top": 0,
        "left": 0,
        "bottom": 0,
        "right": 0
      }
    },
    "elements": {
      "line": {
        "tension": 0.5,
        "borderJoinStyle": "round"
      }
    },
    "scales": {
      "y": {
        "beginAtZero": true,
        "ticks" : {
          "color": "#BFBFBF"
        }
      }
    },
    "animation": true,
    "plugins": {
      "legend": {
        "display": true,
        "position": "top",
        "align": "end",
        "labels": {
          "usePointStyle": true,
          "borderRadius": "2",
          "boxWidth": "8",
          "boxHeight": "8"
        }
      }
    }
  },
  "data": {
    "labels": [
        "15 Jan",
        "16 Jan",
        "17 Jan",
        "18 Jan",
        "19 Jan",
        "20 Jan",
        "21 Jan"
    ],
    "datasets":[
      {
          "type":"line",
          "label": "Line Dataset",
          "data": [10, 20, 30, 40, 50, 40, 30, 20],
          "fill": false,
          "borderColor": "#9254DE"
      },
      {
          "type": "bar",
          "label": "Bar Dataset",
          "data": [10, 20, 25, 20, 30, 40, 35, 10],
          "borderColor": "rgb(255, 99, 132)",
          "backgroundColor": "#4BD4FB"
      }
    ]
  }
}

module.exports = chart;