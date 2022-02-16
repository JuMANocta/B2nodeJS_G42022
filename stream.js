const stream = require('stream')
const fs = require('fs')

// ouverture d'un flux de lecture du fichier
let demo = fs.createReadStream('demo.mp4')
// ouverture d'un flux d'écriture de fichier
let newdemo = fs.createWriteStream('demo3.mp4')

// les données de 'demo' sont ainsi transférées vers le 'newdemo' via un tunnel

const copy = new stream.Transform({
    // 'transform' permet de gérer le flux à la fois en lecture et en écriture
    transform(chunk, encoding, callback){
        callback(null, chunk)
    }
})

demo.pipe(copy).pipe(newdemo)