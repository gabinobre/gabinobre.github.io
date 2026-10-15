// 1. Passa por aqui
function passaDentro() {
  document.querySelector('#passa').textContent = '1. Obrigado por passares!';
}
function passaFora() {
  document.querySelector('#passa').textContent = '1. Passa por aqui!';
}

// 2. Pinta-me com querySelectorAll + dataset
document.querySelectorAll('button.color').forEach((botao) => {
  botao.addEventListener('click', () => {
    document.querySelector('#pinta').style.color = botao.dataset.color;
  });
});

// 3. Alternância de cores ao escrever
const cores = ['lightblue', 'gray', 'lightcoral', 'lightgreen'];
let indice = 0;
function mudaCor(caixa) {
  caixa.style.backgroundColor = cores[indice];
  indice = (indice + 1) % cores.length;
}

// 4. Cor da página com select + this
document.querySelector('#corFundo').addEventListener('change', function () {
  document.body.style.backgroundColor = this.value;
});

// 5. Contador com localStorage
let contagem = Number(localStorage.getItem('counter')) || 0;

const atualizar = (valor) => {
  contagem = valor;
  document.querySelector('#contador').textContent = contagem;
  localStorage.setItem('counter', contagem);
};

document.querySelector('#incrementar').addEventListener('click', () => atualizar(contagem + 1));
document.querySelector('#decrementar').addEventListener('click', () => atualizar(contagem - 1));
document.querySelector('#reiniciar').addEventListener('click', () => atualizar(0));

atualizar(contagem); // mostra o valor guardado quando a página carrega

// Flex: mudar flex-direction com o select
document.querySelector('#direcao').addEventListener('change', function () {
  document.querySelector('#container').style.flexDirection = this.value;
});

// 6. Formulário com onsubmit
document.querySelector('#formulario').onsubmit = (e) => {
  e.preventDefault(); // para não recarregar a página
  const nome = document.querySelector('#nome').value;
  const idade = document.querySelector('#idade').value;
  document.querySelector('#mensagem').textContent = `Olá, o ${nome} tem ${idade}!`;
};

// 7. Temporizador com setInterval
let segundos = 0;
function count() {
  segundos++;
  document.querySelector('#automatico').textContent = segundos;
}
setInterval(count, 1000);
