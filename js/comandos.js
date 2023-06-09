
const ocultarReglas = document.getElementById('reglas')
const ocultarataques = document.getElementById('seleccionar-ataque')
const ocultarmascota = document.getElementById('seleccionar-mascota')
const boton_selecmascota = document.getElementById('boton-mascota')

const sectionMensajes =document.getElementById('resultado')
const ataquesjugador = document.getElementById('ataques-jugador')
const ataquesenemigo = document.getElementById('ataques-enemigo')

const contenedortarjetas = document.getElementById('contenedor-tarjetas')
const ataqueshtml=document.getElementById('ataquess')

const sectionverMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')



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
let mascota = 0
let mascotaene = 0
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
let x 
let y
let mapaBackground = new Image()
mapaBackground.src ='./assets/mapa.png'
let lienzo = mapa.getContext("2d");
let intervalo
let anchomapa
let altomapa
anchomapa=window.innerWidth - 50
anchomaximo = 600
if(anchomapa < anchomaximo){
    anchomapa = 400
    x = 65
    y = 65
}
else{
    anchomapa = 600
    x = 80
    y = 80
}

altomapa= anchomapa*600/800
mapa.width = anchomapa
mapa.height = altomapa
class Mokempom{
    constructor(nombre,foto,vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques=[]
        this.ancho = x
        this.alto = y
        this.x = Math.ceil(Math.random() * (mapa.width- this.ancho))
        this.y = Math.ceil(Math.random() * (mapa.height- this.alto))
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMascota() {
        lienzo.drawImage(this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto)
    }
}

let fennec = new Mokempom('Fenecc','./assets/FENEC.png',3)

let dominuss = new Mokempom('Dominuss','./assets/DOMINUS.png',3)

let octanee = new Mokempom('Octanee','./assets/OCTANEE.png',3)

octanee.ataques.push(
    {nombre: 'Agua💧',id: 'agua',poder: 1},
    {nombre: 'Tsunami🌊',id: 'agua',poder: 10}, 
    {nombre: 'Splash💦',id: 'agua',poder: 4},
    {nombre: 'Flame🔥',id: 'fuego',poder: 2},
    {nombre: 'Terremoto🌎',id: 'tierra',poder: 7})

fennec.ataques.push(
    {nombre: 'Magneto🌎🧲',id: 'tierra',poder: 3},
    {nombre: 'Roca Volcanica🌋🌍',id: 'tierra',poder: 6},
    {nombre: 'Terremoto🥌🌎',id: 'tierra',poder: 10},
    {nombre: 'Flame🔥',id: 'fuego',poder: 2},
    {nombre: 'Agua💧',id: 'agua',poder: 1})
dominuss.ataques.push(
    {nombre: 'Fenix🐦🔥',id: 'fuego',poder: 6},
    {nombre: 'Inferno🔥🌋',id: 'fuego',poder: 10},
    {nombre: 'Flame🔥🔥',id: 'fuego',poder: 2},
    {nombre: 'Splash💦',id: 'agua',poder: 4},
    {nombre: 'Lodo🌎',id: 'tierra',poder: 1})    
mascotas.push(dominuss,fennec,octanee)//agregar a un array vacio x valores

let FeneccE = new Mokempom(mascotas[1].nombre,mascotas[1].foto,mascotas[1].vida)
let dominussE = new Mokempom(mascotas[0].nombre,mascotas[0].foto,mascotas[0].vida)
let octaneeE = new Mokempom(mascotas[2].nombre,mascotas[2].foto,mascotas[2].vida)

//console.log(fennec)//estp sirve para verificar el funcionamiento de 'x' variable es como un depurador web
function iniciarJuego(){
    ocultarReglas.style.display='none'
    ocultarataques.style.display='none'
    sectionverMapa.style.display ='none'

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
        vidaEnemigo = vidaEnemigo - 1
        vidaJugador = vidaJugador - 1
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
    console.log(mascotaene)
    let ataquesenemigos = extraerataques(mascotaene.nombre)
    let random=Math.floor(Math.random()*ataquesenemigos.length-1)
    enemigo = ataquesenemigos[random].nombre
    poderEnemigo = ataquesenemigos[random].poder
    
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
function seleccionarMascotaEnemigo(Menemigo){
    /*resultado = Math.floor(Math.random() * (mascotas.length))*/
    mascotaenemiga = Menemigo.nombre
    document.getElementById('mascota-enemigo').innerHTML=mascotaenemiga
    
    
}
    
function seleccionarMascotaJugador(){
    ocultarmascota.style.display='none'
    sectionverMapa.style.display ='flex'
    iniciarMapa()
    if(document.getElementById('Dominuss').
    checked){
        document.getElementById('mascota-jugador').innerHTML=document.getElementById('Dominuss').id
        //seleccionarMascotaEnemigo()
        mascotajugador =document.getElementById('mascota-jugador').innerHTML=document.getElementById('Dominuss').id 
    }
    else if(document.getElementById('Fenecc').checked){
     
        document.getElementById('mascota-jugador').innerHTML=document.getElementById('Fenecc').id
        mascotajugador =document.getElementById('mascota-jugador').innerHTML=document.getElementById('Fenecc').id 
        //seleccionarMascotaEnemigo()
    }
    else if (document.getElementById('Octanee').checked){
      
        document.getElementById('mascota-jugador').innerHTML=document.getElementById('Octanee').id
        mascotajugador =document.getElementById('mascota-jugador').innerHTML=document.getElementById('Octanee').id 
        //seleccionarMascotaEnemigo()    
    }else{alert("selecciona una mascota")
        location.reload()
    }
    extraerMascota();
    mostrarataques(extraerataques(mascotajugador))
}

function pintarcanva(){
    mascota.x += mascota.velocidadX
    mascota.y += mascota.velocidadY
    FeneccE.x = anchomapa-90
    FeneccE.y = altomapa-150
    
    octaneeE.x = anchomapa-250
    octaneeE.y = altomapa-200

    dominussE.x = 50
    dominussE.y = altomapa-100
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascota.pintarMascota();
    FeneccE.pintarMascota();
    octaneeE.pintarMascota();
    dominussE.pintarMascota();
    if(mascota.velocidadX !== 0 || mascota.velocidadY !== 0){
        revisarColision(FeneccE);
        revisarColision(octaneeE);
        revisarColision(dominussE);

    }    
    //console.log(mascotaene);
}

function teclaPresionada(event){
   switch (event.key) {
        case 'ArrowUp':
            arriba()
            break;
        case 'ArrowDown':
            abajo()
            break;
        case 'ArrowRight':
            derecha()
            break;
        case 'ArrowLeft':
            izquierda()
            break;
    
        default:
            break;
   }
}
function detenermov(){
    mascota.velocidadX = 0
    mascota.velocidadY = 0
}
function arriba(){
    mascota.velocidadY = mascota.velocidadY - 5
}
function abajo(){
    mascota.velocidadY = mascota.velocidadY + 5
}
function izquierda(){
    mascota.velocidadX = mascota.velocidadX - 5
}
function derecha(){
    mascota.velocidadX = mascota.velocidadX + 5
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
function validarataque() {
    botones.forEach((validar) => {
      validar.addEventListener('click', (e) => {
        if (validar.style.backgroundColor === "rgb(10, 35, 70)") { // Verificar si el botón ya tiene el color deseado
            alert("Elige otro ataque"); // No realizar ninguna acción adicional
            return;
        }
  
        if (e.target.id === "agua") {
          ataquejugador = e.target.innerHTML;
          escaladePoder(ataquejugador);
          validar.style.backgroundColor = "#0a2346";
          ataqueagua();
        } else if (e.target.id === "fuego") {
          ataquejugador = e.target.innerHTML;
          escaladePoder(ataquejugador);
          validar.style.backgroundColor = "#0a2346";
          ataquefuego();
        } else if (e.target.id === "tierra") {
          ataquejugador = e.target.innerHTML;
          escaladePoder(ataquejugador);
          validar.style.backgroundColor = "#0a2346";
          ataquetierra();
        } 
      });
    });
  }


function escaladePoder(nombreataque){
    for (let i = 0; i < arrayataquesjugador.length; i++) {
            if(nombreataque == arrayataquesjugador[i].nombre){
                poderJugador = arrayataquesjugador[i].poder
            }
    }
}
function iniciarMapa(){
   
    console.log(mascota);
    intervalo = setInterval(pintarcanva,40)
    window.addEventListener('keydown',teclaPresionada)
    window.addEventListener('keyup',detenermov)
}
function revisarColision(mascotaen){
    const arribaEnemigo =  mascotaen.y
    const abajoEnemigo = mascotaen.y + mascotaen.alto
    const derechaEnemigo = mascotaen.x + mascotaen.ancho
    const izquierdaEnemigo = mascotaen.x

    const arribaMascota =  mascota.y
    const abajoMascota = mascota.y + mascota.alto
    const derechaMascota = mascota.x + mascotaen.ancho
    const izquierdaMascota = mascota.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }
    else{
        alert("Has elegido combatir contra: "+mascotaen.nombre)
        detenermov()
        mascotaene = mascotaen
        seleccionarMascotaEnemigo(mascotaene)
        vidasmascotas()
        sectionverMapa.style.display ='none'
        ocultarataques.style.display='flex'
        ocultarReglas.style.display='flex'
    }
}
function extraerMascota(){
    for (let i = 0; i < mascotas.length; i++) {
        if (mascotajugador == mascotas[i].nombre){
            mascota = mascotas[i]
            console.log(mascota);
            break;
        }
    }
    
}
window.addEventListener('load',iniciarJuego)




