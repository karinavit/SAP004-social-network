ATUALIZAÇÃO DO README v5 - TÓPICO 4 E 6 A REVISAR ANTES DA ENTREGA LOGO DEPOIS DO DEPLOY
# Criando uma Rede Social

# Social Trekkers - (Social Network)

## Índice

* [1. Definiçao de Produto](#1-definição-de-produto)
* [2. Histórias de Usuários](#2-histórias-de-usuários)
* [3. Protótipo](#3-prototipo)
* [4. Implementação da Interface e Critérios de Aceitação](#4-Implementação-da-interface-e-critérios-de-aceitação)
* [5. Instalação do projeto](#3-Instalação-do-projeto)
* [6. Implementações futuras](#6-Implementações-futuras)
* [7. Autores](#6-Autores)
* [8. Considerações Finais](#6-Considerações-Finais)

## 1.Definiçao de Produto
Este projeto foi desenvolvido por [Caroline Pinheiro](https://github.com/CarolPinheiro/), [Jéssica Melise](https://github.com/jessicamelise) e [Karina Vitangelo](https://github.com/karinavit) alunas da 4a Geração da [Laboratoria](https://github.com/Laboratoria) (SAP004).

A proposta deste projeto é criar uma rede social. Escolhemos trabalhar com o tema de Star Trek. 
Como entregável final termos uma página que será uma Single-Page Application (SPA), desenhada com enfoque no mobile first.

## 2. Histórias de Usuários
### História de usuário 1 e 2:
HU1 - "Como usuário novo, devo poder criar uma conta com e-mail e senha válidos para poder iniciar uma sessão e ingressar na Rede Social."
HU2 - "Como usuário novo, devo poder ter a opção de iniciar sessão com minha conta do Google ou Facebook para ingressar na Rede Social sem necessidade de criar uma conta de email válido."

A definição de pronto da história de usuário 1 e 2 ,  acontece com autenticação de login do Firebase, login com o Google e/ou Facebook; telas de Login e Registro com html e css completos.

### História de usuário 3:
HU3 - "Como usuário logado devo poder criar, guardar, modificar no mesmo lugar (in place) e deletar publicações (post) privadas ou públicas"

A definição de pronto da história de usuário 3, acontece ao criar e testar as funções de  publicar, editar e deletar um post com base nas promises do Firebase e também possibilitar que o usuário realize publicações privadas ou públicas.

### História de usuário 4:
HU4 - "Eu como usuário logado, posso dar like e ver a contagem de likes em minhas publicações"

A definição de pronto da história de usuário 4, acontece quando a função de dar o like deve identificar o post que receberá o mesmo e assim atualizar o display conforme novos likes.

### História de usuário 5:
HU5 - "Ao final devo poder ingressar na Rede Social e poder visualizar os dados de meu perfil criado e editá-los."

A definição de pronto da história de usuário 5, acontece com a criação de página de perfil e exibição/edição dos dados do usuário.

### História de usuário 6:
HU6 - "Eu como usuário logado, posso escrever, salvar, editar ou deletar um comentário em minhas publicações."

A definição de pronto da história de usuário 6, acontece com as funções de editar, postar, salvar e deletar que reconhecem o Id do usuário e possibilitam realizar estas ações em seus posts.

### Critérios de Aceitação:
Os critérios de aceitação estarão listados em formato de checklist no item [4. Implementação da Interface e Critérios de Aceitação](#4-Implementação-da-interface-e-critérios-de-aceitação)

## 3. Protótipo 
Nosso protótipo foi implementado no powerpoint, conforme sequência de imagens abaixo:

#### Imagem 01 - Tela inicial Versão Mobile
![Slide1](https://user-images.githubusercontent.com/61189470/84066025-b29ed480-a99b-11ea-9f7d-8086fcd0d7c7.png)

#### Imagem 02 - Interface da Aplicação Versão Mobile 
![Slide2](https://user-images.githubusercontent.com/61189470/84066035-b894b580-a99b-11ea-918c-c031dc99617c.png)

#### Imagem 03 - Tela Inicial Versão Web
![Slide3](https://user-images.githubusercontent.com/61189470/84066046-bc283c80-a99b-11ea-9a68-7501d1151418.png)

#### Imagem 04 - Tela da Aplicação Versão Web
![Slide4](https://user-images.githubusercontent.com/61189470/84066070-c34f4a80-a99b-11ea-8c2c-9a928d6f7288.png)

## 4. Implementação da Interface e Critérios de Aceitação
Em nossa aplicação que pode ser visualizada neste [Link](https://social-trekker.web.app/). 
O usuário pode escolher registrar-se em nosso formulário na tela de registro ou realizar login com a sua conta do google ou facebook.
Nosso projeto foi desenvolvido utilizando o Firebase [Link](https://firebase.google.com/?hl=pt-br),

### Utilizamos as seguintes versões para:
#### Windows:
Windows 10 Home, Node v12.16.1 e Npm 6.13.4
#### Linux:
Linux "Ubuntu 18.04.4 LTS", Node.js v12.17.0 e Npm v12.17.0

### Implementamos a interface conforme checklist dos Critérios de Aceitação:
- [x] Ao realizar o login de forma incorreta uma mensagem de erro aparece na tela, do contrário troca-se a tela para a página inicial da aplicação.
- [x] Ter a página de registro legível caso o usuário não tenha conta registrada.
- [x] Aplicação tem o campo visível e funcionando para logar com uma conta do google.
- [x] Não é necessário recarregar a página quando é realizada uma nova postagem.
- [x] É possível separar publicações em modo privado e público.
- [x] Ícone para dar Like visível e funcionando onde o usuário só consegue dar um único like em qualquer publicação.
- [x] Uma página de perfil do usuário com seus posts e colocar um botão para que ele possa exibir seus dados e editá-los através de um pop-up.
- [x] Os comentários estão funcionando.
- [x] Usuário consegue logar, salvar, editar / deletar as publicações próprias.

## 5. Instalação do projeto

Caso deseje baixar o projeto para sua máquina é possível criar um fork do nosso repositório e depois disso, você deve realizar um "clone" ou "donwload" do **link fornecido pelo seu repositório** para então digitar em seu terminal:

  `git clone <cole seu link após isso>`
  
O repositório será completamente baixado em sua máquina, e caso use o visual studio code, basta entrar na pasta pelo terminal e digitar:

  `code .`

Caso não possua o Node.js instalado, basta clicar nesse link [aqui](https://nodejs.org/pt-br/download/) e fazer o download, pois, para executar ele em seu computador, será necessário realizar a instalação da pasta node modules, com o uso do NPM (nativo do Node.js).

Assim que a instalação tiver sido concluída, basta digitar em seu terminal:

`npm install` 

E aguardar até que o processo tenha sido completo.

### Antes de instalar o Firebase, certifique-se de criar uma conta e abrir um projeto novo ( visto que você não terá acesso ao nosso banco de dados):

Lembre-se de instalar o Firebase, utilizando o comando:

`npm install -g firebase-tools`

Faça login no Google. Execute este comando: (Esse comando conecta sua máquina local ao Firebase e concede acesso aos seus projetos.)

`firebase login`

Inicialize seu projeto utilizando o comando:

  `firebase init`

Para abrir um servidor a fim de executar o projeto em seu navegador, é só digitar:
  
  `firebase serve`

Basta clicar no link (localhost) que será  disponibilizado em seu terminal. 

Após manipular o projeto e então realizar um deploy, utilize o seguinte comando:

`firebase deploy`

### Testes e Eslint
Para visualziar as correções a serem realizadas do Eslint utilize o comando:

`npm run pretest`

Usamos as boas práticas delimitadas pelo Airbnb, conforme pode ser visto neste [Link](https://github.com/airbnb/javascript)

E para realizar os testes utilize o comando:

`npm run test`

## 6. Implementações Futuras
Abaixo um checklist com ideias pata implementações futuras:
- [ ] Hacker Edition - Implementar os testes.
- [ ] Colocar patente no Perfil.
- [ ] Usuários poderem colocar imagens em comentários.
- [ ] Possibilitar do usuário escolher uma foto logo na tela de registro.
- [ ] Possibilitar adicionar amigos e restringir interação do feed somente entre amigos.
- [ ] Colocar um botão de scroll para a pessoa ir direto para o topo da página.
- [ ] Refatoração do código.
- [ ] Implementar webpack.
- [ ] Pesquisa UX com usuário - Mudar palavras do botão do popup de deletar mensagens e comentários por questões de UX e coletar opiniões dpara futuras melhorias.
- [ ] Definir regras para senha válidas.
- [ ] Autenticação do e-mail nas regras.



## 7. Autores
Projeto desenvolvido por [Caroline Pinheiro](https://github.com/CarolPinheiro/), [Jéssica Melise](https://github.com/jessicamelise) e [Karina Vitangelo](https://github.com/karinavit), como terceiro projeto no bootcamp da [Laboratoria](https://github.com/Laboratoria).

## 8. Considerações Finais
Estamos abertas aos feedbacks e demais considerações.

