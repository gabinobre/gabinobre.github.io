const titulo = document.querySelector('#titulo');
const frase = document.querySelector('#frase');
const foto = document.querySelector('#foto');
const avisoFoto = document.querySelector('#aviso-foto');
const caixa = document.querySelector('#caixa');
const numero = document.querySelector('#numero');

function entrar() {
  titulo.textContent = 'Bem-vinda a Tokyo! ';
  titulo.style.color = 'purple';
}

function sair() {
  titulo.textContent = 'Passa o rato por aqui ';
  titulo.style.color = '#bf2b54';
}

function pintar(cor) {
  frase.style.color = cor;
  frase.textContent = 'Agora estou pintada!';
}

let grande = false;

function aumentar() {
  if (grande === false) {
    foto.style.width = '500px';
    avisoFoto.textContent = 'Duplo clique outra vez para diminuir';
    grande = true;
  } else {
    foto.style.width = '250px';
    avisoFoto.textContent = 'Faz duplo clique na foto!';
    grande = false;
  }
}

function mexer(event) {
  caixa.textContent = 'x: ' + event.offsetX + '  y: ' + event.offsetY;
  caixa.style.backgroundColor = '#f6d6de';
}

let contador = 0;

function contar() {
  contador++;
  numero.textContent = contador;
}
