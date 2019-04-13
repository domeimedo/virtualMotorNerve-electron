const WebSocket = require('ws')

let app

exports.start = async function(){
    app = new WebSocket.Server({
        port: 0,
    })

    app.on('connection', (ws)=>{
        ws.on('message', (message)=>{
            console.log("Received: " + message)
            ws.send("Hi, i received " + message)
        })
    })

    return {
        "port": app.address().port
    }
}