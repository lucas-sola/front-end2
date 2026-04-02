const botao = document.querySelectorAll('.btn-pedido')


const inputQtd = document.querySelector('#qtd-lasanha')
const precoTexto = document.querySelector('#preco-lasanha')

if (inputQtd && precoTexto) {
    inputQtd.addEventListener('input', () => {
        const precoUnitario = 45.00
        const total = Number(inputQtd.value) * precoUnitario
        precoTexto.textContent = 'R$' + total
    })
}
botao.forEach(botoes => {
    botoes.addEventListener('click', ()=> {
    console.log('clicou ai em')
    botoes.textContent = 'processando...'
}) 
});

const card = document.querySelectorAll('.card') 

card.forEach(cards => {
    cards.addEventListener('mouseover', () => {
    cards.style.backgroundColor = '#fdf2e9'
})
});

card.forEach(cards => {
    cards.addEventListener('mouseout', () => {
    cards.style.backgroundColor = 'white'
})
});


const inputNome = document.querySelector('#nome')

inputNome.addEventListener('keyup', () => {
    let texto = inputNome.value
    console.log('digitando:' + texto)
})


