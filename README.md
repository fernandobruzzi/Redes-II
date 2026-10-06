# Trabalho de NFV

Site estático do trabalho sobre Virtualização de Funções de Rede. Não há instalação nem etapa de build. Basta abrir `index.html` no navegador.

## Arquivos

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Capa, mapa do trabalho, nomes do grupo e do professor, resumo |
| `problema.html` | Seção 1, contexto e caso do futebol |
| `historia.html` | Seção 2 |
| `definicao.html` | Seção 3 |
| `arquitetura.html` | Seção 4 |
| `vantagens-desvantagens.html` | Seção 5 |
| `projetos.html` | Seção 6 |
| `sdn.html` | Seção 7 |
| `questoes.html` | Perguntas para a turma |
| `bibliografia.html` | Referências |
| `assets/style.css` | Aparência de todas as páginas |
| `assets/site.js` | Menu, mapa da capa e links de anterior e próxima |
| `assets/img/` | Pasta para as imagens |

## Como editar o texto

Cada página é um arquivo HTML independente. Abra o arquivo, procure o trecho "Escreva o texto aqui" e substitua pelo conteúdo. Cada parágrafo fica entre `<p>` e `</p>`.

As caixas com a classe `guia` listam o que cada parte deve cobrir. Apague o bloco `<aside class="guia">` inteiro quando o texto estiver pronto.

Para inserir uma imagem, salve o arquivo em `assets/img/` e use

```html
<figure class="figura">
  <img src="assets/img/nome-do-arquivo.png" alt="Descrição da imagem">
  <figcaption>Legenda e fonte.</figcaption>
</figure>
```

## Como adicionar, remover ou reordenar páginas

1. Copie um arquivo de seção (por exemplo `historia.html`) e dê o novo nome.
2. Abra `assets/site.js` e acrescente uma linha na lista `PAGINAS`, na posição desejada.

O menu, a numeração, o mapa da capa e os links de anterior e próxima se ajustam sozinhos.

## Como mudar cores e fontes

Altere as variáveis do bloco `:root`, no início de `assets/style.css`.

## Como publicar no GitHub Pages

1. Envie todos os arquivos para a raiz do repositório, mantendo a pasta `assets`.
2. No repositório, abra Settings, depois Pages.
3. Em Source, escolha Deploy from a branch, selecione a branch `main` e a pasta `/ (root)`, e salve.
4. Em alguns minutos o site fica disponível no endereço indicado na própria página de configuração.
