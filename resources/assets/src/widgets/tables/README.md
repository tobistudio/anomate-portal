## Example Config

```javascript
  const data = [
    [
        "Winback",
        "Okay we admit it, we miss you",
        233,
        "44/24.66%",
        "10/4.48%",
        "0/0.00%",
    ],
    [
        "Winback",
        "Okay we admit it, we miss you",
        168,
        "24/22.66%",
        "10/4.48%",
        "0/0.00%",
    ],
    [
        "Winback",
        "Okay we admit it, we miss you",
        26,
        "55/24.66%",
        "10/4.48%",
        "0/0.00%",
    ],
    [
        "Winback",
        "Okay we admit it, we miss you",
        5624,
        "55/24.66%",
        "10/4.48%",
        "0/0.00%",
    ],
];
{
    header : {
    title       : "<h3>Automated emails</h3>",
        label       : "<span>Label description goes here </span>",
        actionTitle : "Sent test email"
    },
    dataSet : data,
    columns: [
        { title: 'Email Title' },
        { title: 'Email Subject Line' },
        { title: 'Sent' },
        { title: 'Open' },
        { title: 'Clicked' },
        { title: 'Ordered' },
    ]
}
```

```javascript
 const data = [
    ['London', 'UK', 'Open', '100.00%'],
    ['Dublin', 'Ireland', '214', '100.00%'],
    ['Rode Island', 'USA', '188', '99.53%'],
    ['London', 'UK', 'Open', '100.00%'],
    ['London', 'UK', 'Open', '100.00%'],
    ['London', 'UK', 'Open', '100.00%'],
];

{
    header : {
        title  : "<h3>User location</h3>",
        label  : "<span>Latest activity </span>"
    },
    columns: [
        { title: 'City' },
        { title: 'Country' },
        { title: 'Open' },
        { title: 'Percentage' },
    ],
    dataSet: data,
    actionGroup: [
        {
            title: "Open",
            key: "open",
            active: true,
        },
        {
            title: "Clicked",
            key: "clicked"
        }
    ]
}
```
