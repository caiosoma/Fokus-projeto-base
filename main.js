const html = document.querySelector('html')
const focoButton = document.querySelector('.app__card-button--foco')
const curtoButton = document.querySelector('.app__card-button--curto')
const longoButton = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startButton = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const startPauseCountBt = document.querySelector('#start-pause span')
const countIcon = document.querySelector('.app__card-primary-butto-icon')
const timer = document.querySelector('#timer')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const startSound = new Audio('./sons/play.wav')
const pauseSound = new Audio('./sons/pause.mp3')

let countdownMinutes = 1500
let intervalId = null

// FUNCTION CREATED IN ORDER TO AVOID THE REPETITION OF SAME BUTTON CLICK CODES 
function alterarContexto(contexto) {
    timerCount()
    botoes.forEach(function (botao) {
        botao.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br> 
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
                Quel tal respirar?<br> 
                <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
                Volte para a superfície.<br> 
                <strong class="app__title-strong">Agora uma pausa longa.</strong>
            `
            break
        default:
            break;
    }
}

// CONTEXT BUTTONS
focoButton.addEventListener('click', () => {
    countdownMinutes = 1500
    alterarContexto('foco');
    focoButton.classList.add('active')
})

curtoButton.addEventListener('click', () => {
    countdownMinutes = 300
    alterarContexto('descanso-curto')
    curtoButton.classList.add('active')
})

longoButton.addEventListener('click', () => {
    countdownMinutes = 900
    alterarContexto('descanso-longo')
    longoButton.classList.add('active')
})

// MUSIC CHECK BOX (IN / OFF)
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
    musica.currentTime = 15
    musica.volume = 0.5
})
musica.loop = true; // "PLEASE DON'T STOP THE MUSIC"

// COUNTDOWN METHOD
const countdown = () => {
    if (countdownMinutes <= 0) {
        pauseSound.play() // EXTERNAL SOUND
        zero()
        startPauseCountBt.textContent = 'Começar'
        countIcon.setAttribute('src', './imagens/play_arrow.png')
        return
    }
    countdownMinutes -= 1
    timerCount()
}

startButton.addEventListener('click', startCount)

function startCount() {
    if (intervalId) {
        pauseSound.play()
        zero()
        return
    }
    startSound.play() // EXTERNAL SOUND
    intervalId = setInterval(countdown, 1000)
    startPauseCountBt.textContent = 'Pausar'
    countIcon.setAttribute('src', './imagens/pause.png')

}

function zero() {
    clearInterval(intervalId)
    startPauseCountBt.textContent = 'Retomar'
    countIcon.setAttribute('src', './imagens/play_arrow.png')
    intervalId = null
}
// END OF COUNTDOWN METHOD 

// TIMER
function timerCount() {
    const time = new Date(countdownMinutes * 1000)
    const finalTimer = time.toLocaleString('pt-br', { minute: '2-digit', second: '2-digit' }) // FORMAT THE TIME PRINTED FROM MILISECOND TO "MINUTE MODE"
    timer.innerHTML = `${finalTimer}`
}

timerCount()
