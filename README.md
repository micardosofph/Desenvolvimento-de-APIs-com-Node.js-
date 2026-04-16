#  API To-Do List (Node.js Vanilla)

## Descrição do projeto
Uma API RESTful para gerenciamento de tarefas (To-Do List) construída puramente com Node.js, sem a utilização de frameworks externos como o Express. O objetivo deste projeto é fornecer operações de CRUD (Criar, Ler, Atualizar e Deletar) para tarefas, demonstrando os fundamentos do protocolo HTTP, roteamento manual e manipulação de fluxos de dados (streams) no ambiente Node.

## Tecnologias utilizadas
* **JavaScript**
* **Node.js** (Módulo nativo `http`)
* **Postman** (Para testes das requisições)

## Explicação da solução (Como o problema foi resolvido)
Para resolver o desafio de criar uma API organizada e escalável sem o uso de bibliotecas de terceiros, o projeto foi estruturado separando as responsabilidades de forma similar ao padrão **MVC (Model-View-Controller)**:

1. **Roteamento Customizado (`taskRoutes.js`):** Como não temos o Express, o roteamento foi feito manualmente verificando `req.url` e `req.method` para direcionar a requisição HTTP correta para a função adequada, além de tratar rotas inexistentes com erro 404.
2. **Controladores (`taskController.js`):** Responsáveis por receber as requisições, interagir com o Service e enviar a resposta formatada em JSON. A leitura do `body` nas requisições `POST` e `PUT` foi resolvida utilizando *Promises* para agrupar os *chunks* (pedaços) de dados que chegam por *stream*.
3. **Serviços (`taskService.js`):** Isola a regra de negócio. É aqui que as tarefas são adicionadas, editadas, buscadas e deletadas. 
4. **Armazenamento em Memória:** Para manter a simplicidade do projeto, o "banco de dados" foi resolvido utilizando um array em memória (`let tasks = []`), garantindo uma execução rápida sem necessidade de setup de banco de dados.

## Instalação e Configuração do ambiente

**Pré-requisitos:**
* É necessário ter o [Node.js](https://nodejs.org/) instalado na sua máquina.

**Como instalar as dependências:**
1. Clone este repositório ou faça o download dos arquivos originais.
2. Abra o terminal na pasta raiz do projeto.
3. **Atenção:** Como o projeto foi desenvolvido 100% com módulos nativos do Node.js, **não há dependências externas**. Portanto, você não precisa rodar o comando `npm install`.

## Execução (Como executar o aplicativo)

1. No terminal, navegue até a pasta raiz do seu projeto e inicie o servidor com o comando:
   ```bash
   node app.js
   ```
2. O terminal exibirá a mensagem indicando que o servidor está online:
   ```bash
   API rodando em http://localhost:3000
   ```
3. Utilize um cliente HTTP web como o **Insomnia** ou **Postman** para interagir com a aplicação.

---

### Endpoints da API para Teste

* **Verificar Status**
  * `GET /`
  * Retorna uma mensagem de boas-vindas.

* **Listar Tarefas**
  * `GET /tasks`
  * Retorna o array contendo todas as tarefas cadastradas.

* **Criar Tarefa**
  * `POST /tasks`
  * Enviar no *Body (JSON)*:
    ```json
    {
      "title": "Sua nova tarefa aqui"
    }
    ```

* **Atualizar Tarefa**
  * `PUT /tasks/:id` *(Substitua `:id` pelo número da tarefa)*
  * Enviar no *Body (JSON)*:
    ```json
    {
      "title": "Título atualizado"
    }
    ```

* **Deletar Tarefa**
  * `DELETE /tasks/:id` *(Substitua `:id` pelo número da tarefa)*
  * Deleta a tarefa do sistema.
