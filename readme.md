# CI/CD Pipeline with Cypress and Allure

Este repositório contém a configuração para uma pipeline CI/CD usando GitHub Actions, ```Cypress``` para testes automatizados, ```Allure``` para relatórios de teste, e deploy dos relatórios no GitHub Pages.

## Pré-requisitos

- Node.js instalado na sua máquina.
- Cypress configurado no seu projeto.
- Allure configurado para gerar relatórios a partir dos resultados do Cypress.
- Branch `gh-pages` criada no repositório GitHub.

## Passos para Configuração Allure Cypress

### 1. Instale a ferramenta de linha de comando Allure Report, se ela ainda não estiver instalada no seu sistema operacional.

```bash
npm install --save-dev allure-commandline
```

### 2. Instale o adaptador Allure Cypress.

```bash
npm install --save-dev allure-cypress
```

### 3. No arquivo e2e, seção do seu script de configuração do Cypress , defina uma setupNodeEvents() função que chame allureCypress(), conforme mostrado no exemplo.

```javascript
const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on);
    },
  },
});
```
### 4. No seu arquivo de suporte E2E , importe os comandos do Allure Cypress.

```bash
import "allure-cypress";
```

## Passos para criação Workflow GitHub Actions

### 1. Criar a Branch `gh-pages`

No terminal, execute os seguintes comandos para criar e inicializar a branch `gh-pages`:

```bash
git checkout --orphan gh-pages
git reset --hard
git commit --allow-empty -m "Initializing gh-pages branch"
git push origin gh-pages
git checkout main
```

### 2. Configurar GitHub Pages
No repositório GitHub:

- Vá para Settings.
- Role para baixo até a seção Pages.
- Configure a fonte do GitHub Pages para a branch gh-pages e clique em Save.

### 3. Habilite o acesso de gravação para execuções de fluxo de trabalho

Ao enviar arquivos para o branch GitHub Pages, o fluxo de trabalho usa um token de autenticação gerado pelo GitHub. No entanto, a configuração padrão não permite que o GitHub Actions envie arquivos para o repositório, e você pode encontrar erros como este nos logs de execução do seu fluxo de trabalho:

```bash
remote: Permission to ⟨USER⟩/⟨REPOSITORY⟩.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/⟨USER⟩/⟨REPOSITORY⟩.git/':
The requested URL returned error: 403
```
Para corrigir isso, você precisa conceder permissões de gravação ao token.

Na página do projeto no GitHub, vá para:
- Configurações → Ações → Geral.
- Na seção Permissões do fluxo de trabalho , selecione a opção Permissões de leitura e gravação.
- Clique em Salvar.

### 4. Configurar o Workflow do GitHub Actions
Crie o arquivo .github/workflows/main.yml no repositório com o seguinte conteúdo:

### 5. Executar a Pipeline
Cada vez que você fizer push para a branch main ou abrir um pull request para a branch main, a pipeline será executada automaticamente:

Os testes Cypress serão executados.
Um relatório Allure será gerado e salvo como um artefato.
O relatório Allure será publicado no GitHub Pages.

### 6. Acessar o Relatório Allure
Após a execução da pipeline, você pode acessar o relatório Allure publicado no GitHub Pages na seguinte URL:

```
https://<seu-usuario>.github.io/<seu-repositorio>/
```

Substitua <seu-usuario> pelo nome do seu usuário ou organização no GitHub, e <seu-repositorio> pelo nome do repositório.


## Autor

- [@victtorhenrique](https://github.com/victtorhenrique)