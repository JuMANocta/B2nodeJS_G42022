let http = require('http'), // utilisation req res serveur html
    fs = require('fs'), // lecture d'un fichier
    url = require('url'); // utilisation URL
// création d'un serveur (node attends une requête)
let comp = 0
http.createServer().on('request', (req, res)=>{
    // utiliser les réponses et les requêtes utilisateur
    comp++
    console.log('Requête émise par un utilisateur ' + comp )
    // console.log(url.parse(req.url))
    // new version
    let baseURL = req.protocol + '://' + req.headers.host + '/'
    let reqURL = new URL(req.url, baseURL)
    let paramURL = reqURL.searchParams
    console.log(reqURL)
    // ancienne version
    let query = url.parse(req.url).query
    // lecture d'un fichier à afficher à l'utilisateur
    fs.readFile('index.html', 'utf-8', (err, data)=>{
        // gérer l'erreur
        if(err){
            res.writeHead(404)
            res.end('404')
        }else{
            res.writeHead(200, {'content-type':'text/html; charset=utf8'})
            // res.write(data); res.end()
            let name = paramURL.get('name')
            // if(!name){
            //     res.write('Bonjour Anonyme')
            // }else{
            //     res.write('Bonjour ' + name)
            // }
            // // opération ternaire la même que le if
            // name ? res.write('Bonjour ' + name) : res.write('Bonjour Anonyme')
            name = name ? name : 'Anonyme'
            data = data.replace('{{ name }}', name)
            res.end(data)
        }
    })
}).listen('80')

// Gère les évènements