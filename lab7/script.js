const nodeListaProdutos = document.querySelector('#produtos div');
const nodeCesto = document.querySelector('#cesto div');
const nodeTotal = document.querySelector('#total');
if (!localStorage.getItem('produtos-selecionados')) {
  localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

function criarProduto(produto) {
  const article = document.createElement('article');

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

  const botao = document.createElement('button');
  botao.textContent = '+ Adicionar ao cesto';

  botao.addEventListener('click', () => {
    const selecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));
    selecionados.push(produto);
    localStorage.setItem('produtos-selecionados', JSON.stringify(selecionados));
      atualizaCesto();
  });

  article.append(titulo, imagem, descricao, preco, rating, botao);

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


  const botao = document.createElement('button');
  botao.textContent = '- Remover do cesto';

  botao.addEventListener('click', () => {
    const selecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));
    const indice = selecionados.findIndex((p) => p.id === produto.id);
    selecionados.splice(indice, 1);
    localStorage.setItem('produtos-selecionados', JSON.stringify(selecionados));
    atualizaCesto();
  });

    article.append(titulo, imagem, preco, botao);

  return article;
}

function renderizarProdutos(produtos) {
  produtos.forEach((produto) => {
    const article = criarProduto(produto);
    nodeListaProdutos.append(article);
  });
}

function atualizaCesto() {
  nodeCesto.innerHTML = '';

  const selecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));

  selecionados.forEach((produto) => {
    const article = criaProdutoCesto(produto);
    nodeCesto.append(article);
  });

  let total = 0;
  selecionados.forEach((produto) => {
    total = total + produto.price;
  });
  nodeTotal.textContent = `Custo total: ${total.toFixed(2)} €`;
}




renderizarProdutos(produtos);
  atualizaCesto();
