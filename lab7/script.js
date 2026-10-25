// A. Estado e variáveis com referência de elementos do DOM
const nodeListaProdutos = document.querySelector('#produtos div');
const nodeCesto = document.querySelector('#cesto div');
const nodeTotal = document.querySelector('#total');
// se ainda não existir a chave no localStorage, cria-a com uma lista vazia
if (!localStorage.getItem('produtos-selecionados')) {
  localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

// B. Funções utilitárias
function criarProduto(produto) {
  // 1. criar o article
  const article = document.createElement('article');

  // 2. criar os elementos com a informação do produto
  const titulo = document.createElement('h2');
  titulo.textContent = produto.title;

  const imagem = document.createElement('img');
  imagem.src = produto.image;
  imagem.alt = produto.title;

  const descricao = document.createElement('p');
  descricao.textContent = produto.description;

  const preco = document.createElement('p');
  preco.textContent = `${produto.price} €`;

  const rating = document.createElement('p');
  rating.textContent = `⭐ ${produto.rating.rate} (${produto.rating.count} avaliações)`;

    // botão para adicionar ao cesto
  const botao = document.createElement('button');
  botao.textContent = '+ Adicionar ao cesto';

  botao.addEventListener('click', () => {
    // ir buscar a lista guardada
    const selecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));
    // juntar este produto
    selecionados.push(produto);
    // guardar outra vez
    localStorage.setItem('produtos-selecionados', JSON.stringify(selecionados));
          // mostrar o cesto atualizado
      atualizaCesto();
  });

    // 3. meter tudo dentro do article
  article.append(titulo, imagem, descricao, preco, rating, botao);

  // 4. devolver o article
  return article;
}

function criaProdutoCesto(produto) {
  const article = document.createElement('article');

  const titulo = document.createElement('h3');
  titulo.textContent = produto.title;

  const imagem = document.createElement('img');
  imagem.src = produto.image;
  imagem.alt = produto.title;

  const preco = document.createElement('p');
  preco.textContent = `${produto.price} €`;


    // botão para remover do cesto
  const botao = document.createElement('button');
  botao.textContent = '- Remover do cesto';

  botao.addEventListener('click', () => {
    // ir buscar a lista guardada
    const selecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));
    // descobrir em que posição está este produto
    const indice = selecionados.findIndex((p) => p.id === produto.id);
    // tirar 1 elemento nessa posição
    selecionados.splice(indice, 1);
    // guardar outra vez
    localStorage.setItem('produtos-selecionados', JSON.stringify(selecionados));
    // mostrar o cesto atualizado
    atualizaCesto();
  });

    article.append(titulo, imagem, preco, botao);

  return article;
}

// C. Event handlers
function renderizarProdutos(produtos) {
  produtos.forEach((produto) => {
    const article = criarProduto(produto);
    nodeListaProdutos.append(article);
  });
}

function atualizaCesto() {
  // apagar o que estava no cesto
  nodeCesto.innerHTML = '';

  // ir buscar a lista ao localStorage
  const selecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));

  // criar um article para cada produto e meter no cesto
  selecionados.forEach((produto) => {
    const article = criaProdutoCesto(produto);
    nodeCesto.append(article);
  });

    // calcular o preço total
  let total = 0;
  selecionados.forEach((produto) => {
    total = total + produto.price;
  });
  nodeTotal.textContent = `Custo total: ${total.toFixed(2)} €`;
}


// D. Event Listeners


// E. Inicialização
renderizarProdutos(produtos);
  atualizaCesto();
