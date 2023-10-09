## Roteiro
Neste roteiro, você aprenderá a configurar o ambiente do Cypress, a ferramenta de testes automatizados, na sua última versão.

    - Configurando ambiente ok 
	- Preparando a aplicação a ser testada ok 
	- Criando a estrutura inicial do teste ok 
	- Integrando com BDD (Cucumber) ok
	- Automatizando seu primeiro teste
		- Automatizando a tela de Login
	 	- Utilizando intercept de requisiçoes
		- Conhecendo o Session
           - Interagindo com outros elementos
		- CSS Selector
		- xpath
		- Id
		- selects

## configurando ambiente
O Cypress irá realizar os testes nos end-points da API. Porém, antes de qualquer iteração, tem-se o NodeJS como recurso para preparar e tornar mais seguro e controlado o nosso ambiente, ao manipular o banco de dados.
Passo 1:
Verifique se o Node.js  está instalado na sua máquina Digitando **Node --version**. Caso não esteja, faça o download e a instalação no site oficial https://nodejs.org.


Passo 2:
Crie um projeto Node.js com o comando:
**npm init -y**

Passo 3:
Instale o Cypress como dependência de desenvolvimento:
**npm install cypress --save-dev**

Passo 4:
Crie o arquivo de configuração do Cypress com o comando:
**npx cypress open**
Isso irá criar o diretório "cypress" e gerar o arquivo de configuração "cypress.json".

## Preparando a aplicação a ser testada


https://github.com/labtracktecnologia/novopedidex

Git estava instalado

Docker instalado 


Passo 5:
Configure o arquivo "cypress.config.js" de acordo com suas necessidades.

Exemplo:
**
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:8080/sign-in",
    chromeWebSecurity: false,
  },
});

**

Onde:

"baseUrl" é a URL base do site a ser testado.


## Criando a estrutura inicial do teste
e2e
	features
		login.feature
	step_definitions
		login.js
fixture
    example.json
pages
	LoginPage.js
support
	commands.js
	e2e.js

## integrando com BDD (Cucumber)const { defineConfig } = require("cypress");

https://github.com/badeball/cypress-cucumber-preprocessor

1- npm install @badeball/cypress-cucumber-preprocessor


2 - add cypress.config.js  "@bahmutov/cypress-esbuild-preprocessor": "^2.1.3",

const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

//If using this approach, just call the key "setupNodeEvents" in the E2E configurations
// async function setupNodeEvents(on, config) {
//   await addCucumberPreprocessorPlugin(on, config);
//   on(
//     "file:preprocessor",
//     createBundler({
//       plugins: [createEsbuildPlugin(config)],
//     })
//   );
//   return config;
// }

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: "http://localhost:8080/sign-in",
    chromeWebSecurity: false,
  },
});
