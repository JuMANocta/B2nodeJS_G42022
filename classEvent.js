// appel des librairies pour la gestion
const EventEmitter = require('events')
const http = require('http')
const fs = require('fs')
const url = require('url')

// création d'une classe JS pour mettre en pratique un évènement
// méthodes async à utiliser pour faire les actions
let App = {
    // méthode auto lancé pour l'objet JS
    start: (port)=>{
        // déclaration de mon écouteur
        let monEcouteur = new EventEmitter()
        // déclaration de mon serveur web
        let server = http.createServer((req, res)=>{
            // réponse envoyée au navigateur
            // res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
            // rootage des pages HTML 
            if(req.url == '/'){
                monEcouteur.emit('root', res, req)
            }
            else if(req.url == '/index2'){
                monEcouteur.emit('index2', res, req)
            }
            else if(req.url == '/google'){
                monEcouteur.emit('google',res, req)
            }
            else{
                monEcouteur.emit('404', res, req)
            }
            // res.end()
        }).listen(port)
        return monEcouteur
    }
}
let app = App.start(8080)
app.on('root', (res, req)=>{
    // res.write('Je suis à la racine')
    fs.readFile('index.html','utf-8',(err,data)=>{
        if(err){
            res.writeHead(404)
            res.end('404')
        }else{
            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
            res.end(data)
        }
    })
})
app.on('index2', (res,req)=>{
    // res.write('Je suis sur index2')
    fs.readFile('index2.html','utf-8',(err,data)=>{
        if(err){
            res.writeHead(404)
            res.end('404')
        }else{
            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
            res.end(data)
        }
    })
})
app.on('404', (res,req)=>{
    // res.write('Je suis sur 404')
    fs.readFile('404.html','utf-8',(err,data)=>{
        if(err){
            res.writeHead(404)
            res.end('404')
        }else{
            res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'})
            res.end(data)
        }
    })
})
app.on('google',(res,req)=>{
    res.writeHead(302, {location: "https://google.fr"})
    res.end()
})