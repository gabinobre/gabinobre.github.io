// A. Estado e variáveis com referência de elementos do DOM
const nodeListaProdutos = document.querySelector('#produtos div');
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
  });


    // 3. meter tudo dentro do article
  article.append(titulo, imagem, descricao, preco, rating, botao);

  // 4. devolver o article
  return article;
}

// C. Event handlers
function renderizarProdutos(produtos) {
  produtos.forEach((produto) => {
    const article = criarProduto(produto);
    nodeListaProdutos.append(article);
  });
}


// D. Event Listeners


// E. Inicialização
renderizarProdutos(produtos);
