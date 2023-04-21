
const chart = {
  "type": "doughnut",
  "options": {
    "responsive":true,
    "devicePixelRatio":4,
    "maintainAspectRatio":true,
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
    "datasets": [
      {
        "label": "Opened",
        "borderJoinStyle" : "round",
        "borderWidth" : "5",
        "borderColor" : "#FFF",
        "hoverBorderColor" : "#FFF",
        "backgroundColor": [
          "rgba(125, 226, 255, 1)",
          "#FFF"
        ],
        "data": [
          80,
          20
        ]
      },
      {
        "label": "Clicked",
        "borderJoinStyle" : "round",
        "borderWidth" : "5",
        "borderColor" : "#FFF",
        "hoverBorderColor" : "#FFF",
        "backgroundColor": [
          "rgba(179, 127, 235, 1)",
          "#FFF"
        ],
        "data": [
          60,
          40
        ]
      },
      {
        "label": "Purchased",
        "borderJoinStyle" : "round",
        "borderWidth" : "5",
        "borderColor" : "#FFF",
        "hoverBorderColor" : "#FFF",
        "angle" : 5,
        "backgroundColor": [
          "rgba(255, 133, 192, 1)",
          "#FFF"
        ],
        "data": [
          50,
          50
        ]
      },
      {
        "label": "Unsubscribed",
        "borderJoinStyle" : "round",
        "borderWidth" : "5",
        "borderColor" : "#FFF",
        "hoverBorderColor" : "#FFF",
        "backgroundColor": [
          "rgba(255, 229, 143, 1)",
          "#FFF"
        ],
        "data": [
          40,
          60
        ]
      }
    ]
  }
};

module.exports = chart;