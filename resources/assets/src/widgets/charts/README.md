# Anomate APP

## Example Config
```javascript
{
    type : 'doughnut',
    header : {
        title  : "<h3>Campaign performance</h3>",
        label  : "<span>Label</span>"
    },
    chartTitle: {
        title: 625,
        label: "Received",
    },
    showLabels: true,
    label: {
        position: "left",
    },
    dateFilter: true,
    data: {
        datasets: [
            {
                label: "Opened",
                backgroundColor: ["rgba(125, 226, 255, 1)"],
                data: [80],
            },
            {
                label: "Clicked",
                backgroundColor: ["rgba(179, 127, 235, 1)"],
                data: [60],
            },
            {
                label: "Purchased",
                backgroundColor: ["rgba(255, 133, 192, 1)"],
                data: [50],
            },
            {
                label: "Unsubscribed",
                backgroundColor: ["rgba(255, 229, 143, 1)"],
                data: [20],
            },
        ],
    }
}
```
```javascript
{
    type : 'line',
    header : {
        title  : "<h3>Total impressions</h3>",
        label  : "<span>Label</span>"
    },
    showLabels: true,
    label: {
        position: "top",
        direction: "end",
    },
    dateFilter: true,
    data: {
        labels: ["15 Jan", "16 Jan", "17 Jan", "18 Jan", "19 Jan", "20 Jan", "21 Jan"],
        datasets: [
            {
            label: "Line Dataset",
            borderColor: "rgba(125, 226, 255, 1)",
            data: [10, 20, 30, 40, 50, 40, 30, 20],
            fill: false,
            },
            {
            label: "Bar Dataset",
            borderColor: "rgba(179, 127, 235, 1)",
            data: [10, 20, 25, 20, 30, 40, 35, 10],
            },
        ],
    }
}
```
```javascript
{
    type : 'line',
    header : {
        title  : "<span>Total revenue </span>",
        label  : "<h2>£150,000 </h2>"
    },
    showLabels : true,
    label: {
        position: "header",
    },
    data : {
        "labels": [
            "14 Dec",
            "19 Dec",
            "23 Dec",
            "27 Dec",
            "2 Jan",
            "5 Jan"
        ],
        "datasets": [
            {
                "label": "Dataset 1",
                "borderColor": "rgba(0, 0, 0, 1)",
                "backgroundColor": "rgba(0, 0, 0, 1)",
                "data": [
                    7,
                    64,
                    56,
                    13,
                    0,
                    62
                ]
            },
            {
                "label": "Dataset 2",
                "borderColor": "rgba(146, 100, 222, 1)",
                "backgroundColor": "rgba(146, 40, 222, 1)",
                "data": [
                    15,
                    95,
                    24,
                    33,
                    22,
                    18
                ]
            },
            {
                "label": "Dataset 3",
                "borderColor": "rgba(75, 212, 251, 1)",
                "backgroundColor": "rgba(75, 212, 251, 1)",
                "data": [
                    78,
                    32,
                    68,
                    49,
                    8,
                    8
                ]
            }
        ]
    }
}
```