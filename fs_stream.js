// Utilisation des Streams avec fs
let fs = require('fs')
let file = 'demo.mp4'

fs.stat(file, (err, stats) => {
    let total = stats.size // taille du fichier
    let progress = 0 // progréssion de lecture copie du fichier
    let read = fs.createReadStream(file) // lecture du fichier
    let write = fs.createWriteStream('demo2.mp4') // permet d'écrire ou copier le fichier demandé
    read.on('data', (chunk)=>{
        progress += chunk.length
        console.log("J'ai lu " + Math.round(100 * progress/total) + "%")
    }) // le téléchargement ou mise en mémoire pour soit lire directement ou en utilisant la methode "pipe" pour copier le fichier
    // vérifier le fin de lecture d'un fichier
    read.on('end', ()=>{
        console.log('J\'ai fini de lire le fichier')   
    })
    read.pipe(write)
    write.on('finish', ()=>{
        console.log('Le fichier est bien copier')
    })
})