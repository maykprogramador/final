
const ocultarReglas = document.getElementById('reglas')
const ocultarataques = document.getElementById('seleccionar-ataque')
const ocultarmascota = document.getElementById('seleccionar-mascota')
const boton_selecmascota = document.getElementById('boton-mascota')

const sectionMensajes =document.getElementById('resultado')
const ataquesjugador = document.getElementById('ataques-jugador')
const ataquesenemigo = document.getElementById('ataques-enemigo')

const contenedortarjetas = document.getElementById('contenedor-tarjetas')
const ataqueshtml=document.getElementById('ataquess')
let boton_fuego
let boton_agua 
let boton_tierra
let botones = []
let poderJugador
let poderEnemigo
let arrayataquesjugador
ataquejugador =''
enemigo =''
gameover=''
contjugador = 0
contenemigo = 0
let mascotas = []
let mascotajugador
let mascotaenemiga
/*ESCALAS DE PODER
tsunami 10
terremoto  8
inferno 7
fénix 6
roca volcánica 5
splash 4 
magneto 3
flame 2 
agua 1
lodo 1*/ 
class Mokempom{
    constructor(nombre,foto,vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques=[]
    }
}

let fennec = new Mokempom('Fenecc','./assets/FENEC.jpg',5)

let dominuss = new Mokempom('Dominuss','./assets/DOMINUS.jpg',5)

let octanee = new Mokempom('Octanee','./assets/OCTANEE.jpg',5)

dominuss.ataques.push(
    {nombre: 'Agua💧',id: 'agua',poder: 1},
    {nombre: 'Tsunami🌊',id: 'agua',poder: 10}, 
    {nombre: 'Splash💦',id: 'agua',poder: 4},
    {nombre: 'Flame🔥',id: 'fuego',poder: 2},
    {nombre: 'Terremoto🌎',id: 'tierra',poder: 8})

fennec.ataques.push(
    {nombre: 'Magneto🌎🧲',id: 'tierra',poder: 3},
    {nombre: 'Roca Volcanica🌋🌍',id: 'tierra',poder: 5},
    {nombre: 'Terremoto🥌🌎',id: 'tierra',poder: 8},
    {nombre: 'Flame🔥',id: 'fuego',poder: 2},
    {nombre: 'Agua💧',id: 'agua',poder: 1})
octanee.ataques.push(
    {nombre: 'Fenix🐦🔥',id: 'fuego',poder: 6},
    {nombre: 'Inferno🔥🌋',id: 'fuego',poder: 7},
    {nombre: 'Flame🔥🔥',id: 'fuego',poder: 2},
    {nombre: 'Splash💦',id: 'agua',poder: 4},
    {nombre: 'Lodo🌎',id: 'tierra',poder: 1})    
mascotas.push(dominuss,fennec,octanee)//agregar a un array vacio x valores

//console.log(fennec)//estp sirve para verificar el funcionamiento de 'x' variable es como un depurador web
function iniciarJuego(){
    ocultarReglas.style.display='none'
    ocultarataques.style.display='none'

    mascotas.forEach((Mokempom)=>{
        opciondeMokepom =`
        <input type="radio"  name = "mascota" id= ${Mokempom.nombre}> 
        <label class = "tarjetas-de-mokepom" for=${Mokempom.nombre}>
            <p>${Mokempom.nombre}</p>
            <img src=${Mokempom.foto} alt=${Mokempom.nombre}> 
        </label>
        `
        //toda la linea anterior me inserta todo lo de las comillas al doc html modificandolo
        contenedortarjetas.innerHTML += opciondeMokepom
    })
    
    boton_selecmascota.addEventListener('click',seleccionarMascotaJugador)
    
    
}
function finDeljuego(){
    
    if(poderJugador == poderEnemigo){
        gameover = "EMPATE"
    }
    else if(poderJugador > poderEnemigo){
        vidaEnemigo = vidaEnemigo - 1
        gameover = "GANASTE"
        }
    else{
        gameover = "PERDISTE"
        vidaJugador = vidaJugador - 1
    }
    mensajes()
    if(vidaJugador == 0 || vidaEnemigo == 0){
        setTimeout(gameOverr,1000)
    }

}

function gameOverr(){
    if(vidaJugador <= 0 && vidaEnemigo <= 0){
        alert("!!EMPATE!!,Oh vuelve a intentarlo ")
        location.reload();
    }
    else if(vidaJugador <= 0){
        alert("!!PERDISTE!!, Que mala suerte intenta de nuevo")
        location.reload();
       
    }else if(vidaEnemigo <= 0){
        alert("!!GANASTE🎁🎀🎉🎉🙌!!")
        location.reload();
    }
}
function mensajes(){
    document.getElementById('vidajug').innerHTML=vidaJugador
    document.getElementById('vidaenem').innerHTML=vidaEnemigo
    /*parrafo.innerHTML = ataquejugador+" , "+enemigo+"--"+gameover+"--"*/
    let nuevoataquesjugador= document.createElement('p')
    let nuevoataquesenemigo= document.createElement('p')
    
    sectionMensajes.innerHTML=gameover
    nuevoataquesjugador.innerHTML=ataquejugador
    nuevoataquesenemigo.innerHTML=enemigo
    
    ataquesjugador.appendChild(nuevoataquesjugador)
    ataquesenemigo.appendChild(nuevoataquesenemigo)

}   

function ataqueEnemigo(){
    let ataquesenemigos = extraerataques(mascotaenemiga)
    let random=Math.floor(Math.random()*ataquesenemigos.length)
    enemigo = ataquesenemigos[random].nombre
    poderEnemigo = ataquesenemigos[random].poder
   // console.log(enemigo)
    finDeljuego()
    
}
function ataquefuego (){
    contjugador = 1
    ataqueEnemigo()
}
function ataqueagua (){
    contjugador = 2
    ataqueEnemigo()
}
function ataquetierra (){ 
    contjugador = 3
    ataqueEnemigo()
}
function seleccionarMascotaEnemigo(){
    resultado = Math.floor(Math.random() * (mascotas.length))
    document.getElementById('mascota-enemigo').innerHTML=mascotas[resultado].nombre
    mascotaenemiga = mascotas[resultado].nombre
}
    
function seleccionarMascotaJugador(){
    ocultarmascota.style.display='none'
    ocultarReglas.style.display='flex'
    ocultarataques.style.display='flex'
    if(document.getElementById('Dominuss').checked){
        
        document.getElementById('mascota-jugador').innerHTML=document.getElementById('Dominuss').id
        seleccionarMascotaEnemigo()
        mascotajugador =document.getElementById('mascota-jugador').innerHTML=document.getElementById('Dominuss').id 
    }
    else if(document.getElementById('Fenecc').checked){
     
        document.getElementById('mascota-jugador').innerHTML=document.getElementById('Fenecc').id
        mascotajugador =document.getElementById('mascota-jugador').innerHTML=document.getElementById('Fenecc').id 
        seleccionarMascotaEnemigo()
    }
    else if (document.getElementById('Octanee').checked){
      
        document.getElementById('mascota-jugador').innerHTML=document.getElementById('Octanee').id
        mascotajugador =document.getElementById('mascota-jugador').innerHTML=document.getElementById('Octanee').id 
        seleccionarMascotaEnemigo()    
    }else{alert("selecciona una mascota")}
    mostrarataques(extraerataques(mascotajugador))

}

function extraerataques(mascotajugador){
    let ataques
    for (let i = 0; i < mascotas.length; i++) {
        if (mascotajugador == mascotas[i].nombre){
            ataques = mascotas[i].ataques
        }
    }
    return ataques
}
function mostrarataques(ataques){
    arrayataquesjugador = ataques
    ataques.forEach((ataque)=>{
        opciondeataque =`
        <button id=${ataque.id} class ="boton-ataque Bataque">${ataque.nombre}</button>
        `
        //toda la linea anterior me inserta todo lo de las comillas al doc html modificandolo
        ataqueshtml.innerHTML += opciondeataque
    })
    
    botones = document.querySelectorAll('.Bataque')
    vidasmascotas()
    validarataque()
}
function vidasmascotas(){
    for (let i = 0; i < mascotas.length; i++) {
        if (mascotajugador == mascotas[i].nombre){
            vidaJugador = mascotas[i].vida
        }
        if(mascotaenemiga == mascotas[i].nombre){
            vidaEnemigo=mascotas[i].vida
        }
    }
    document.getElementById('vidajug').innerHTML=vidaJugador
    document.getElementById('vidaenem').innerHTML=vidaEnemigo
}
function validarataque(){
    botones.forEach((validar)=>{
        validar.addEventListener('click',(e)=>//me extrae las propiedades del evento en este caso target.id
        {
            console.log(validar)
            if(e.target.id == "agua"){
                //console.log(e.target.id)
                ataquejugador = e.target.innerHTML
                escaladePoder(ataquejugador)
                ataqueagua()
            }
            if(e.target.id == "fuego"){
               // console.log(e.target.id)
                ataquejugador = e.target.innerHTML
                escaladePoder(ataquejugador)
                ataquefuego()
            }
            if(e.target.id == "tierra"){
               // console.log(e.target.id)
                ataquejugador = e.target.innerHTML
                escaladePoder(ataquejugador)
                ataquetierra()
            }
        })
    })
}

function escaladePoder(nombreataque){
    for (let i = 0; i < arrayataquesjugador.length; i++) {
            if(nombreataque == arrayataquesjugador[i].nombre){
                poderJugador = arrayataquesjugador[i].poder
            }
    }
}
window.addEventListener('load',iniciarJuego)




