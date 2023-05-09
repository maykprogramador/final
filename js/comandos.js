ataquejugador =''
enemigo =''
gameover=''
vidaJugador = 3
vidaEnemigo = 3
contjugador = 0
contenemigo = 0
function iniciarJuego(){
    document.getElementById('vidajug').innerHTML=vidaJugador
    document.getElementById('vidaenem').innerHTML=vidaEnemigo
    let boton_selecmascota = document.getElementById('boton-mascota')
    boton_selecmascota.addEventListener('click',seleccionarMascotaJugador)
    let boton_fuego = document.getElementById('fuego')
    boton_fuego.addEventListener('click',ataquefuego)
    let boton_agua = document.getElementById('agua')
    boton_agua.addEventListener('click',ataqueagua)
    let boton_tierra = document.getElementById('tierra')
    boton_tierra.addEventListener('click',ataquetierra)
}
function finDeljuego(){

    if(contjugador == contenemigo){
        vidaEnemigo = vidaEnemigo - 1
        vidaJugador = vidaJugador - 1 
        gameover = "EMPATE"
    }
    else if(contjugador == 1 && contenemigo == 3){
        vidaEnemigo = vidaEnemigo - 1
        gameover = "GANASTE"
    }else if(contjugador == 2 && contenemigo == 1){
        vidaEnemigo = vidaEnemigo - 1
       
    }else if(contjugador == 3 && contenemigo == 2){
        vidaEnemigo = vidaEnemigo - 1
        gameover = "GANASTE"
    }else{
        vidaJugador = vidaJugador - 1
        gameover = "PERDISTE"
    }
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
function reiniciar(){
    //window.addEventListener('load',iniciarJuego)
}

function mensajes(){
    document.getElementById('vidajug').innerHTML=vidaJugador
    document.getElementById('vidaenem').innerHTML=vidaEnemigo
    let sectionMensajes =document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = ataquejugador+" , "+enemigo+"--"+gameover+"--"

    sectionMensajes.appendChild(parrafo)
}

function ataqueEnemigo(){
    let random=Math.ceil(Math.random()*3)
    if(random == 1){
        enemigo ="MASCOTA ENEMIGO ATACA CON FUEGO"
        contenemigo = 1
    }else if(random == 2){
        enemigo ="MASCOTA ENEMIGO ATACA CON AGUA"
        contenemigo =2
    }else{
        enemigo ="MASCOTA ENEMIGA ATACA CON TIERRA"
        contenemigo =3
    }
    
    //document.getElementById('atEnemigo').innerHTML=enemigo
    //document.getElementById('atJugador').innerHTML=ataquejugador
    alert(enemigo)
    finDeljuego()
    mensajes()
}
function ataquefuego (){
    ataquejugador ="TU MASCOTA ATACO CON FUEGO" 
    contjugador = 1
    alert(ataquejugador)
    ataqueEnemigo()
}
function ataqueagua (){
    ataquejugador ="TU MASCOTA ATACO CON AGUA"
    contjugador = 2
    alert(ataquejugador)
    ataqueEnemigo()
}
function ataquetierra (){
    ataquejugador ="TU MASCOTA ATACO CON TIERRA" 
    contjugador = 3
    alert(ataquejugador)
    ataqueEnemigo()
}
function seleccionarMascotaEnemigo(){
    resultado = Math.ceil(Math.random() *3)
    if(resultado == 1){document.getElementById('mascota-enemigo').innerHTML="Fuego fresquito"
    }
    else if(resultado == 2){document.getElementById('mascota-enemigo').innerHTML="fenec"
    }
    else{document.getElementById('mascota-enemigo').innerHTML="optane"}
}

function seleccionarMascotaJugador(){
    if(document.getElementById('mascota1').checked){
        //*alert("seleccionaste mascota1")
        document.getElementById('mascota-jugador').innerHTML="Fuego fresquito"
        seleccionarMascotaEnemigo()
    }
    else if(document.getElementById('mascota2').checked){
        //alert("seleccionaste mascota2")
        document.getElementById('mascota-jugador').innerHTML="fenec"
        seleccionarMascotaEnemigo()
    }
    else if (document.getElementById('mascota3').checked){
       // alert("seleccionaste mascota3") 
        document.getElementById('mascota-jugador').innerHTML="optane"
        seleccionarMascotaEnemigo()    
    }else{alert("selecciona una mascota")}
    
}

window.addEventListener('load',iniciarJuego)




