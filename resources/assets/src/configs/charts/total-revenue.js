
const chart = {
  "type": "line",
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
      "x": {
        "display": true,
        "grid": {
          "color": "#FFF"
        },
        "ticks" : {
          "color": "#BFBFBF"
        }
      },
      "y": {
        "lineWidth": 5,
        "grid": {
          "color": "#D9D9D9"
        },
        "ticks" : {
          "color": "#BFBFBF",
          "stepSize": 3
        }
      }
    },
    "animation": true,
    "plugins": {
        "legend": {
            "display": false
        }
    }
  }
};

module.exports = chart;
