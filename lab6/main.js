const nodeInputNumero = document.querySelector('form input[type="number"]');
const nodeInputSubmit = document.querySelector('form input[type="submit"]');
const nodeUlColecao = document.querySelector('#colecao ul');
const nodeTotal = document.querySelector('#colecao span');
const nodeUlRepetidos = document.querySelector('#repetidos ul');
const nodeTotalRepetidos = document.querySelector('#repetidos span');
const nodeForm = document.querySelector('form');

const colecao = JSON.parse(localStorage.getItem('colecao')) || [];
const repetidos = JSON.parse(localStorage.getItem('repetidos')) || [];
let totalRepetidos = repetidos.length;

function guardaCarta() {
  const numero = Number(nodeInputNumero.value);

  if (colecao.includes(numero)) {
    repetidos.push(numero);
    repetidos.sort((a, b) => a - b);
    atualizaLista(repetidos, nodeUlRepetidos);
    totalRepetidos++;
    nodeTotalRepetidos.textContent = totalRepetidos;
  } else {
    colecao.push(numero);
    colecao.sort((a, b) => a - b);
    atualizaLista(colecao, nodeUlColecao);
    nodeTotal.textContent = colecao.length;
  }

  nodeInputNumero.value = '';
}

function atualizaLista(lista, nodeUl) {
  nodeUl.innerHTML = '';
  lista.forEach((numero, indice) => {
    const nodeLi = document.createElement('li');

    if (lista === repetidos) {
      nodeLi.innerHTML = `${numero} <button data-indice="${indice}">Eliminar</button>`;
    } else {
      nodeLi.textContent = numero;
    }

    nodeUl.append(nodeLi);
  });

  if (lista === repetidos) {
    associaBotoesEliminar();
  }
}

function eliminaRepetido(indice) {
  repetidos.splice(indice, 1);
  totalRepetidos--;
  nodeTotalRepetidos.textContent = totalRepetidos;
  atualizaLista(repetidos, nodeUlRepetidos);
}

nodeForm.onsubmit = (event) => {
  event.preventDefault();
  guardaCarta();
};

function associaBotoesEliminar() {
  document.querySelectorAll('#repetidos button').forEach((botao) => {
    botao.addEventListener('click', () => {
      eliminaRepetido(Number(botao.dataset.indice));
    });
  });
}

function guardaDados() {
  localStorage.setItem('colecao', JSON.stringify(colecao));
  localStorage.setItem('repetidos', JSON.stringify(repetidos));
}

atualizaLista(colecao, nodeUlColecao);
atualizaLista(repetidos, nodeUlRepetidos);
nodeTotal.textContent = colecao.length;
nodeTotalRepetidos.textContent = totalRepetidos;
