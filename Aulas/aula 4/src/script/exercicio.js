// exercicio 1

// let nome = prompt(`Fala o seu primeiro nome ai`)
// let sobrenome = prompt(`Fala o sobrenome agora`)

// let nomeCompleto = nome + " " +  sobrenome

// alert(`Nome completo real oficial: ${nomeCompleto.trim().toLowerCase()}`)

// alert(`Tem essa quantidade de caracter aqui o ${nomeCompleto.length} (CONTANDO COM O ESPACO NO MEIO)`)

// let nome_completo = nome.concat(sobrenome)
// console.log(nome_completo) CONCATTTTTTTTTTTTTTTTTTTTTTTTT

// exercicio 2

// let qtdPessoas = prompt(`Quantas pessoas tem na sua mesa?`)
// let valorTotal = prompt(`Qual foi o valor total da conta?`)
// let valorIndividual = valorTotal / qtdPessoas

// alert(`Cada um vai pagar R$${valorIndividual.toFixed(2)}`)

// exercicio 3

// let valorConta = prompt(`Qual foi o valor da conta paizao?`);
// let cupom = confirm(`Fala ai, ce tem cupom ou nao tem`);

// if (valorConta > 150 || cupom) {
//   console.log(`Parabens ai, ganhou frete gratis `);
// } else {
//   console.log(`Nao ganhou frete gratis e foi bloqueado pelo serasa`);
// }

// exercicio 4
// let min = 0
// let max = 10
// let numero = Math.floor(Math.random() * (max - min + 1)) + min;
// let numeroUsuario = prompt("Escolhe um numero ai")

// if (numero === Number(numeroUsuario)) {
//     alert(`Parabens ai, ganhou nada com nada, mas acertou o numero`)
// } else {
//     alert(`Que cara bobao, errou o numero, era o ${numero}`)
// }

// exercicio 5

// class Veiculo {
//     constructor(modelo, marca, ano) {
//         this.modelo = modelo
//         this.marca = marca
//         this.ano = ano
//     }
//     calcularIdade() {
//         let data = new Date()
//         let anoAtual = data.getFullYear()
//         return anoAtual-this.ano
//     }
// }

// let nomeObj = prompt("modelo do carro agr")
// let marcaObj = prompt("Fala ai a marca do carro")
// let anoObj = prompt("Agora fala a idade do carro (quando ele foi fabricado, por exemplo, 2004)")

// let carro1 = new Veiculo(nomeObj, marcaObj, Number(anoObj))

// alert(`${carro1.modelo}, ${carro1.marca} e a idade dele eh ${carro1.calcularIdade()}`)


