// Utilisation des Streams avec fs
let fs = require('fs')
let file = 'demo.mp4'

fs.stat(file, (err, stats) => {
    let total = stats.size
    let progress = 0
    let read = fs.createReadStream(file)
    read.on('data', (chunk)=>{
        progress += chunk.length
        console.log("J'ai lu " + Math.round(100 * progress/total) + "%")
    })
})