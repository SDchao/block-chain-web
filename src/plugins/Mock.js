const Mock = require("mockjs")

Mock.mock("/devapi/history", () => {
    return {
        "msg": "SUCCESS",
        "history": [
            {
                "timestamp": 1621413696,
                "tx_id": "ef2",
                "value": "asdjicfhnduifnhasc"
            },
            {
                "timestamp": 1621413696,
                "tx_id": "ef2",
                "value": "asdjicfhnduifnhasc"
            }
        ]
    }
})