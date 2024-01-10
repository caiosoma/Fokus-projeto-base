const html = document.querySelector('html')
const focoButton = document.querySelector('.app__card-button--foco')
const curtoButton = document.querySelector('.app__card-button--curto')
const longoButton = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3')

function alterarContexto(contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
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
        default:
            break;
    }
}

focoButton.addEventListener('click', () => {
    alterarContexto('foco');
    focoButton.classList.add('active')
})

curtoButton.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoButton.classList.add('active')
})

longoButton.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo')
    banner.setAttribute('src', './imagens/descanso-longo.png')
    switch ('h1') {
        case "h1":
            titulo.innerHTML = `
            Volte para a superfície.<br> 
            <strong class="app__title-strong">Agora uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }
    longoButton.classList.add('active')
    focoButton.classList.remove('active')
    curtoButton.classList.remove('active')
})

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})
musica.loop = true;



