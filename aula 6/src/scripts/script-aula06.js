const botaoCurtida = document.querySelector('#btn-curtir')
const contador = document.querySelector('#contador')
const preview = document.querySelector('#preview-texto')
const campoTexto = document.querySelector('#campo-texto')
const caixaCor = document.querySelector('#caixa-cor')

let totalCurtidas = 0

botaoCurtida.addEventListener('click', () => {
    totalCurtidas++
    contador.textContent = totalCurtidas
})

campoTexto.addEventListener('input', () => {
    const texto = campoTexto.value
    if (texto === "") {
        preview.textContent = 'Digitando: ...'
    } else {
        preview.textContent = texto
    }
})

caixaCor.addEventListener('mouseenter', () => {
    caixaCor.style.backgroundColor = 'blue'
})

caixaCor.addEventListener('mouseleave', () => {
    caixaCor.style.backgroundColor = 'gray'
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'R') {
        totalCurtidas = 0
        contador.textContent = totalCurtidas
        campoTexto.value = ''
        preview.textContent = 'Digitando: ...'
        console.log('resetado com sucesso!')
    }
})