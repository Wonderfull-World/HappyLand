/* =========================
ELEMENTOS
========================= */

const app = document.getElementById("app")

/* =========================
ESTADO PERSISTENTE
========================= */

let state = JSON.parse(localStorage.getItem("mf_state")) || {
filesOpened:0,
horrorUnlocked:false
}

function saveState(){
localStorage.setItem("mf_state",JSON.stringify(state))
}

/* =========================
AUDIO
========================= */

const kidsMusic = new Audio("https://www.bensound.com/bensound-music/bensound-funnysong.mp3")
kidsMusic.loop=true
kidsMusic.volume=0.3

const horrorMusic = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3")
horrorMusic.loop=true
horrorMusic.volume=0.05

document.body.addEventListener("click",()=>{
kidsMusic.play().catch(()=>{})
},{once:true})

/* =========================
PÁGINAS
========================= */

const pages={

home:`

<h1>🌈 MUNDO FELIZ 🌈</h1>

<img src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" width="120">

<p class="blink">✨ SITE NOVO!!! ✨</p>

<div class="box">

<h2>explorar</h2>

<div class="file" onclick="goto('downloads')">📁 downloads</div>
<div class="file" onclick="goto('games')">📁 jogos</div>

</div>

`,

downloads:`

<h1>DOWNLOADS</h1>

<div class="file" onclick="openFile()">arquivo_001.exe</div>
<div class="file" onclick="openFile()">arquivo_002.exe</div>
<div class="file" onclick="openFile()">arquivo_003.exe</div>

<br>

<button onclick="goto('home')">voltar</button>

`,

games:`

<h1>JOGOS</h1>

<p>em construção...</p>

<button onclick="goto('home')">voltar</button>

`,

horror:`

<h1 class="glitch">você não devia ter vindo</h1>

<p>este arquivo não é seu</p>

<div class="file" onclick="goto('log1')">log_001</div>
<div class="file" onclick="goto('log2')">log_002</div>

`,

log1:`

<h1>registro corrompido</h1>

<p>██████████████</p>

<button onclick="goto('horror')">voltar</button>

`,

log2:`

<h1>registro</h1>

<p>ele está olhando</p>

<button onclick="goto('horror')">voltar</button>

`,

notfound:`

<h1 class="glitch">404</h1>

<p>arquivo não encontrado</p>

`

}

/* =========================
ROTEADOR
========================= */

function goto(page){
location.hash=page
}

function render(){

let hash = location.hash.replace("#","")

if(hash==="") hash="home"

if(!pages[hash]) hash="notfound"

if(hash==="horror" || hash==="log1" || hash==="log2"){

document.body.className="horror"

kidsMusic.pause()
horrorMusic.play().catch(()=>{})

}

app.innerHTML = pages[hash]

}

/* =========================
ABRIR ARQUIVOS
========================= */

function openFile(){

state.filesOpened++
saveState()

app.innerHTML=`

<h1>abrindo arquivo...</h1>

<p>nada encontrado</p>

<button onclick="goto('downloads')">voltar</button>

`

if(state.filesOpened>=3 && !state.horrorUnlocked){

state.horrorUnlocked=true
saveState()

setTimeout(()=>{
goto("horror")
},1500)

}

}

/* =========================
EVENTOS
========================= */

window.addEventListener("load",render)
window.addEventListener("hashchange",render)

/* =========================
DIGITAR SEGREDO
========================= */

let secret="help"
let buffer=""

document.addEventListener("keydown",e=>{

buffer+=e.key

if(buffer.includes(secret)){

goto("horror")

}

})

/* =========================
TÍTULO GLITCH
========================= */

setInterval(()=>{

if(document.body.className==="horror"){

document.title = Math.random()>0.5
?"não olhe atrás"
:"ele está perto"

}

},2000)

/* =========================
EVENTO ATRASADO
========================= */

setTimeout(()=>{

if(document.body.className==="horror"){

alert("rastreamento iniciado")

}

},15000)
