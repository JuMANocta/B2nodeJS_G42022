// gerer les évènements
const EventEmitter = require('events')
// instancier l'écouteur
let monEcouteur = new EventEmitter()
// fonction pour écouter les évènements
// ()=>{} == function(){}
monEcouteur.on('hop', ()=>{
    console.log('Hop, Hop, Hop')
})
monEcouteur.on('hop1', ()=>{
    console.log('Hop1, Hop1, Hop1')
})
monEcouteur.on('hop2', ()=>{
    console.log('Hop2, Hop2, Hop2')
})
// appel de l'écouteur
monEcouteur.emit('hop')
monEcouteur.emit('hop1')
monEcouteur.emit('hop2')