# Anomate APP

## Example Config
```javascript
    that.renderLogs = function () {
        const logs = that.logs.map((item) => {
            return {
                id: item.cid,
                time: item.get("time"),
                color: item.get("color"),
                message: item.get("message"),
            }
        });
        let widget = new ActivityView({
            header : {
                title  : "Timeline",
                label  : "Latest activity"
            },
            logs,
        }).render()
    };
```
