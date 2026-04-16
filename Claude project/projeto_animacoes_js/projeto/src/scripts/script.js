/* ============================================================
   script.js — Lógica de animações do projeto
   
   Cada seção cuida de uma animação diferente.
   As animações usam 3 técnicas principais:
     1. setInterval  → repete algo a cada X ms
     2. setTimeout   → executa algo uma vez após X ms
     3. requestAnimationFrame (rAF) → roda antes de cada frame
                                      da tela (~60x por segundo)
   ============================================================ */


/* ----------------------------------------------------------
   UTILITÁRIO: busca elemento por ID (atalho para não repetir
   document.getElementById toda hora)
   ---------------------------------------------------------- */
function el(id) {
  return document.getElementById(id);
}


/* ==========================================================
   ANIMAÇÃO 1 — CONTADOR
   Sobe de 0 até um número alvo de forma suave usando
   setInterval: a cada 30ms incrementa o valor e atualiza
   o texto na tela.
   ========================================================== */

// Pegamos o elemento do contador e o botão uma vez só
const spanContador = el('contador');
const btnContador  = el('btn-contador');

// Guarda a referência do intervalo para poder cancelá-lo depois
let intervaloContador = null;

// Função que inicia (ou reinicia) a animação do contador
function iniciarContador() {
  const valorAlvo = 1337;   // número que queremos atingir
  const duracao   = 1200;   // duração total em ms
  const passos    = 60;     // quantas vezes vamos atualizar
  const incremento = Math.ceil(valorAlvo / passos); // quanto sobe por passo

  let atual = 0;

  // Para qualquer contagem que esteja rodando antes de começar nova
  clearInterval(intervaloContador);

  // Reseta o display
  spanContador.textContent = '0';

  // Começa o intervalo: executa a função a cada 20ms
  intervaloContador = setInterval(() => {

    atual += incremento; // incrementa o valor atual

    // Garante que não passa do alvo
    if (atual >= valorAlvo) {
      atual = valorAlvo;
      clearInterval(intervaloContador); // para o intervalo ao chegar no alvo
      btnContador.textContent = 'Reiniciar';
    }

    // Atualiza o texto na tela
    spanContador.textContent = atual.toLocaleString('pt-BR');

    // Efeito de "pulo": adiciona a classe, e após 100ms remove
    // Isso cria um pequeno zoom toda vez que o número muda
    spanContador.classList.add('contador--pulso');
    setTimeout(() => spanContador.classList.remove('contador--pulso'), 100);

  }, 20); // ← 20ms entre cada passo
}

// Escuta o clique no botão e chama a função
btnContador.addEventListener('click', iniciarContador);


/* ==========================================================
   ANIMAÇÃO 2 — BARRA DE PROGRESSO
   Usa requestAnimationFrame para animar a barra de 0% a 100%
   de forma super suave, sincronizada com o monitor.
   ========================================================== */

const barraProgresso = el('progress-bar');
const labelProgresso = el('progress-label');
const btnProgresso   = el('btn-progresso');

// Variável que guarda o ID do frame atual (para cancelar se necessário)
let rafProgresso = null;

function iniciarProgresso() {
  // Cancela qualquer animação anterior
  cancelAnimationFrame(rafProgresso);

  // Reseta a barra
  barraProgresso.style.width = '0%';
  labelProgresso.textContent = '0%';
  btnProgresso.textContent   = 'Carregando...';
  btnProgresso.disabled      = true; // desabilita o botão durante a animação

  let progresso = 0; // começa do zero

  // Função que roda a cada frame (≈60x por segundo)
  function passo() {
    progresso += 0.8; // velocidade: quanto avança por frame

    if (progresso >= 100) {
      progresso = 100;
      barraProgresso.style.width = '100%';
      labelProgresso.textContent = '100%';
      btnProgresso.textContent   = 'Recarregar';
      btnProgresso.disabled      = false;
      return; // sai da função — a animação acabou
    }

    // Atualiza a largura da barra e o texto do label
    barraProgresso.style.width   = progresso.toFixed(1) + '%';
    labelProgresso.textContent   = Math.round(progresso) + '%';

    // Pede ao navegador para chamar "passo" novamente no próximo frame
    rafProgresso = requestAnimationFrame(passo);
  }

  // Dispara o primeiro frame
  rafProgresso = requestAnimationFrame(passo);
}

btnProgresso.addEventListener('click', iniciarProgresso);


/* ==========================================================
   ANIMAÇÃO 3 — BOLINHA QUICANDO
   Usa requestAnimationFrame em loop infinito.
   A bola tem posição (x, y) e velocidade (vx, vy).
   A cada frame, atualizamos posição e verificamos colisão
   com as bordas da arena.
   ========================================================== */

const arena     = el('arena');
const bola      = el('bola');
const btnBola   = el('btn-bola');

let rafBola     = null;   // ID do frame atual
let bolaRodando = false;  // controla se está animando ou parado

// Estado da bola: posição e velocidade
let bx = 10, by = 10;    // posição inicial (x, y) em pixels
let vx = 3,  vy = 3;     // velocidade (pixels por frame)

function animarBola() {
  // Dimensões da arena (onde a bola pode se mover)
  const largura  = arena.offsetWidth;
  const altura   = arena.offsetHeight;
  const tamanho  = bola.offsetWidth; // tamanho da bola (28px)

  // Atualiza a posição somando a velocidade
  bx += vx;
  by += vy;

  // Colisão com a borda direita ou esquerda: inverte vx
  if (bx + tamanho >= largura || bx <= 0) {
    vx *= -1; // inverte a direção horizontal
  }

  // Colisão com a borda inferior ou superior: inverte vy
  if (by + tamanho >= altura || by <= 0) {
    vy *= -1; // inverte a direção vertical
  }

  // Move a bola visualmente usando left/top
  bola.style.left = bx + 'px';
  bola.style.top  = by + 'px';

  // Solicita o próximo frame (loop infinito enquanto bolaRodando = true)
  if (bolaRodando) {
    rafBola = requestAnimationFrame(animarBola);
  }
}

function toggleBola() {
  if (bolaRodando) {
    // Pausa: cancela o próximo frame e muda o estado
    bolaRodando = false;
    cancelAnimationFrame(rafBola);
    btnBola.textContent = 'Continuar';
  } else {
    // Inicia ou continua a animação
    bolaRodando = true;
    rafBola = requestAnimationFrame(animarBola);
    btnBola.textContent = 'Pausar';
  }
}

btnBola.addEventListener('click', toggleBola);


/* ==========================================================
   ANIMAÇÃO 4 — EFEITO TYPEWRITER
   Usa setTimeout recursivo: após escrever uma letra,
   agenda a próxima após um pequeno delay.
   ========================================================== */

const textoTypewriter = el('typewriter');
const btnTypewriter   = el('btn-typewriter');

// A frase que será "digitada" na tela
const frases = [
  'Olá, mundo!',
  'Aprendendo JS...',
  'Animações são divertidas ✦',
];

let fraseAtual = 0;  // índice da frase atual
let letraAtual = 0;  // índice da letra atual dentro da frase
let timeoutTW  = null;  // referência do timeout para poder cancelar

function digitarLetra() {
  const frase = frases[fraseAtual];

  // Verifica se ainda há letras para digitar
  if (letraAtual < frase.length) {
    // Adiciona a próxima letra ao texto exibido
    textoTypewriter.textContent = frase.slice(0, letraAtual + 1);
    letraAtual++;

    // Agenda a próxima letra após 80ms (velocidade de digitação)
    timeoutTW = setTimeout(digitarLetra, 80);

  } else {
    // Terminou a frase: espera 1.5s e começa a apagar
    timeoutTW = setTimeout(apagarLetra, 1500);
  }
}

function apagarLetra() {
  const frase = frases[fraseAtual];

  if (letraAtual > 0) {
    // Remove a última letra
    letraAtual--;
    textoTypewriter.textContent = frase.slice(0, letraAtual);

    // Apaga mais rápido que escreve (50ms)
    timeoutTW = setTimeout(apagarLetra, 50);

  } else {
    // Apagou tudo: passa para a próxima frase (voltando para 0 se necessário)
    fraseAtual = (fraseAtual + 1) % frases.length;

    // Pequena pausa antes de começar a escrever de novo
    timeoutTW = setTimeout(digitarLetra, 400);
  }
}

function iniciarTypewriter() {
  // Cancela qualquer timeout em andamento antes de reiniciar
  clearTimeout(timeoutTW);

  // Reseta o estado
  letraAtual = 0;
  fraseAtual = 0;
  textoTypewriter.textContent = '';

  btnTypewriter.textContent = 'Reiniciar';

  // Começa a digitar
  digitarLetra();
}

btnTypewriter.addEventListener('click', iniciarTypewriter);


// requestAnimationFrame → qualquer coisa visual que precisa ser fluida: mover elementos, canvas, jogos, física, scroll customizado.
// setInterval → coisas que precisam acontecer em tempo fixo sem relação com a tela: relógio, polling de dados, piscar uma notificação.
// setTimeout → executar algo uma vez depois de um delay, ou criar sequências de passos com pausa entre eles.