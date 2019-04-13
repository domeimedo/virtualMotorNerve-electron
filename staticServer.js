const express = require('express')

let app = express()
app.use('/', express.static(__dirname + '/internal/root'))

function setupUsingOptions(options){
    if(! options) return;

    if(options.hasOwnProperty('wssPort')){
        app.get('/wssport', (req, res, next)=>{
            res.send(String(options["wssPort"]));
        })
    }
}


exports.start = function (options){
    if(options) {
        setupUsingOptions(options)
    }

    return new Promise((resolve, reject)=>{
        let server = app.listen(0, ()=>{
            resolve({
                "port": server.address().port
            });
        })
    });
}