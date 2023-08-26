
<h1 align="center">Social Postify</h1>

✅ Requisitos
- Geral
    - [ ]  O projeto deve ser desenvolvido inteiramente em NestJS.
    - [ ]  A porta utilizada pelo seu servidor deve ser a `3000` (padrão do Nest).
    - [ ]  Versionamento usando Git é obrigatório, crie um repositório público no seu perfil do GitHub apenas com o código do back-end.
    - [ ]  Faça commits a cada funcionalidade implementada.
    - [ ]  Utilize o dotenv.
    - [ ]  Utilize o Prisma para gerenciar o banco de dados e executar as queries necessárias.
    - [ ]  É necessário implementar a camada de repository para executar o acesso ao banco, não utilize a camada de service para isso!
    - [ ]  Divida o código em módulos (`@Modules`)! Crie um para o Prisma e para cada uma das entidades separadamente (`Posts`, `Medias` & `Publication`)
- Rotas
    - Health
        - Endpoint somente para garantir que a aplicação está em pé.
        - [ ]  **GET** `/health`: Retorna a mensagem `“I’m okay!”` com o status code `200 OK`.
    - Medias
        - As `medias` representam as redes sociais nas quais as publicações (`publications`) serão feitas, por exemplo: Facebook, Instagram, Twitter, LinkedIn, Threads, etc.
        - **POST** `/medias`
            - [ ]  Deve receber (pelo corpo da requisição), os parâmetros: `title` e `username`.
                
                ```
                {
                	"title": "Instagram",
                	"username": "myusername",
                }
                ```
                
            - [ ]  Na ausência de campos obrigatórios, retorne o status code `400 Bad Request`.
            - [ ]  Impeça a criação de um novo registro com a mesma combinação de `title` e `username` (caso exista, retornar status code ****`409 Conflict`).
        - **GET** `/medias`
            - [ ]  Deve retornar todas as mídias registradas no sistema no seguinte formato:
            
            ```tsx
            [
            	{
            		"id": 1,
            		"title": "Instagram",
            		"username": "myusername", //
            	},
            	{
            		"id": 2,
            		"title": "Twitter",
            		"username": "myusername",
            	}
            ]
            ```
            
            - [ ]  Caso não exista nenhuma mídia cadastrada, retornar um array vazio.
        - **GET** `/medias/:id`
            - [ ]  Deve retornar o registro compatível com o id fornecido:
            
            ```tsx
            [
            	{
            		"id": 1,
            		"title": "Instagram",
            		"username": "myusername",
            	}
            ]
            ```
            
            - [ ]  Se não houver nenhum registro compatível, retornar status code `404 Not Found`.
        - **PUT** `/medias/:id`
            - [ ]  Deve atualizar o registro compatível com o id fornecido:
            
            ```tsx
            [
            	{
            		"title": "Instagram",
            		"username": "myusername-2",
            	}
            ]
            ```
            
            - [ ]  Se não houver nenhum registro compatível, retornar status code `404 Not Found`.
            - [ ]  A mudança não pode violar a regra de `title` e `username` únicos. Se isso acontecer, retorne o status code `409 Conflict`.
        - **DELETE** `/medias/:id`
            - [ ]  Deve deletar o registro compatível com o id fornecido.
            - [ ]  Se não houver nenhum registro compatível, retornar status code `404 Not Found`.
            - [ ]  A media só pode ser deletada se não estiver fazendo parte de nenhuma publicação (agendada ou publicada). Neste caso, retornar o status code `403 Forbidden`.
    - Posts
        - Os posts representam os conteúdos que serão postados nas redes sociais (`medias`) por meio de uma publicação (`publication`):
        - **POST** `/posts`
            - [ ]  Deve receber (pelo corpo da requisição), os parâmetros: `title`, `text` e `image`, sendo o último opcional.
                
                ```
                {
                	"title": "Why you should have a guinea pig?",
                	"text": "https://www.guineapigs.com/why-you-should-guinea",
                }
                ```
                
            - [ ]  Na ausência de campos obrigatórios, retorne o status code `400 Bad Request`.
        - **GET** `/posts`
            - [ ]  Deve retornar todas os posts registrados no sistema no seguinte formato:
            
            ```tsx
            [
            	{
            		"id": 1
            		"title": "Why you should have a guinea pig?",
            		"text": "https://www.guineapigs.com/why-you-should-guinea",
            	},
            	{
            		"id": 2,
            		"title": "Man dies after coding for 400 hours no stop",
            		"text": "https://www.devnews.com/dies-after-400",
            		"image": "https://www.devnews.com/dead-dev.jpg"
            	}
            ]
            ```
            
            - [ ]  Caso não exista nenhum post cadastrado, retornar um array vazio.
        - **GET** `/posts/:id`
            - [ ]  Deve retornar o registro compatível com o id fornecido:
            
            ```tsx
            [
            	{
            		"id": 1
            		"title": "Why you should have a guinea pig?",
            		"text": "https://www.guineapigs.com/why-you-should-guinea",
            	},
            ]
            ```
            
            - [ ]  Se não houver nenhum registro compatível, retornar status code `404 Not Found`.
        - **PUT**  `/posts/:id`
            - [ ]  Deve atualizar o registro compatível com o id fornecido:
            
            ```tsx
            [
            	{
            		"title": "Why you should't have a guinea pig?",
            		"text": "https://www.guineapigs.com/why-you-should-guinea",
            	},
            ]
            ```
            
            - [ ]  Se não houver nenhum registro compatível, retornar status code `404 Not Found`.
        - **DELETE** `/posts/:id`
            - [ ]  Deve deletar o registro compatível com o id fornecido.
            - [ ]  Se não houver nenhum registro compatível, retornar status code `404 Not Found`.
            - [ ]  O post só pode ser deletado se não estiver fazendo parte de nenhuma publicação (agendada ou publicada). Neste caso, retornar o status code `403 Forbidden`.
    - Publications
        - As publicações são os agendamentos dos `posts` nas redes sociais (`medias`).
        - **POST** `/publications`
            - [ ]  Deve receber (pelo corpo da requisição), os parâmetros: `mediaId`, `postId` e `date`:
                
                ```
                {
                	"mediaId": 1,
                	"postId": 1,
                	"date": "2023-08-21T13:25:17.352Z"
                }
                ```
                
            - [ ]  Na ausência de campos obrigatórios, retorne o status code `400 Bad Request`.
            - [ ]  Se não existirem registros compatíveis com o `mediaId` e o `postId`, retornar o status code `404 Not Found`.
        - **GET** `/publications`
            - [ ]  Deve retornar todas os posts registrados no sistema no seguinte formato:
            
            ```tsx
            [
            	{
            		"id": 1,
            		"mediaId": 1,
            		"postId": 1,
            		"date": "2023-08-21T13:25:17.352Z"
            	},
            	{
            		"id": 1,
            		"mediaId": 2,
            		"postId": 1,
            		"date": "2023-08-21T13:25:17.352Z"
            	},
            ]
            ```
            
            - [ ]  Caso não exista nenhuma publicação cadastrada, retornar um array vazio.
            - Filtros especiais:
                - [ ]  published (true/false): publicações que já foram pro ar ou não.
                - [ ]  after (date): publicações depois de determinada data.
        - **GET** `/publications/:id`
            - [ ]  Deve retornar o registro compatível com o id fornecido:
            
            ```tsx
            [
            	{
            		"id": 1,
            		"mediaId": 1,
            		"postId": 1,
            		"date": "2023-08-21T13:25:17.352Z"
            	},
            ]
            ```
            
            - [ ]  Se não houver nenhum registro compatível, retornar status code `404 Not Found`.
        - **PUT**  `/publications/:id`
            - [ ]  Deve atualizar o registro compatível com o id fornecido:
            
            ```tsx
            [
            	{
            		"id": 1,
            		"mediaId": 1,
            		"postId": 1,
            		"date": "2023-09-21T13:25:17.352Z"
            	},
            ]
            ```
            
            - [ ]  Não deve ser possível alterar as informações de um registro de uma publicação que já foi publicada, somente as agendadas. Neste caso, retornar o status code `403 Forbidden`.
            - [ ]  Se não houver nenhum registro compatível, retornar status code `404 Not Found`.
            - [ ]  Se não existirem registros compatíveis com o `mediaId` e o `postId`, retornar o status code `404 Not Found`.
        - **DELETE** `/publications/:id`
            - [ ]  Deve deletar o registro compatível com o id fornecido.
            - [ ]  Se não houver nenhum registro compatível, retornar status code `404 Not Found`.
- Testes automatizados (integração)
    - [ ]  Desenvolva testes de integração para cada uma das rotas determinadas (pelo menos 1 teste para cada uma).
    - [ ]  Configure um banco de dados somente para testes.
    - [ ]  Quando aplicável, use factories e a biblioteca faker.



## 🛠 &nbsp;Skills
<div align="center">
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" width="52" alt="node logo"  />
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" width="52" alt="ts logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" width="52" alt="js logo"  />      
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="40" width="52" alt="express logo"  />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/npm/npm-original-wordmark.svg" height="40" width="52" alt="npm logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="40" width="52" alt="git logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="40" width="52" alt="github logo" />                                   
</div>
<hr/>

## 🚀 &nbsp;Links

- [Deploy]().<br/>

```zsh
# iniciar servidor
npm run start

# testar
npm run test:e2e

<hr/>

## 💬 &nbsp;Contact
<img align="left" src="https://avatars.githubusercontent.com/curtyraissa?size=100">

Feito por [Raissa Curty](https://github.com/curtyraissa)!

<a href="https://www.linkedin.com/in/raissa-curty/" target="_blank">
    <img style="border-radius:50%;" src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/linkedin/default.svg" width="52" height="40" alt="linkedin logo"  />
</a>&nbsp;