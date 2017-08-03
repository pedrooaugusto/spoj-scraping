# Scraping br.spoj.com

O rakeamento de usuários da versão BR do spoj não esta funcionando, em função disso,
criei esta aplicação. A aplicação coleta informações dos alunos do spoj que atendem ao curso de Técnicas
Avançadas em Programação na faculdade Unicarioca (a partir da url: br.spoj.users/uc_userName) e então
monta um rank baseado em quem fez mais problemas.

## Getting Started

Essas instruções vão lhe fornecer uma cópia da aplicação funcionando em seu computador.

### Prerequisites

Prerequisitos da aplicação e como instala-los.

```
nodejs
npm
```

### Installing

Instalando o aplicativo

Depois de descarregar o repositório, instale as dependências com:

```
npm install
```

Depois inicialize o aplicativo com:

```
node index.js
```

Feito isso o servidor deve se encontrar na escuta da porta 5000 navegue até localhost:5000 e para acessar o aplicativo.

## Built With

* [nodejs] - Linguaguem usada
* [npm] - Gerenciador de packages
* [express] - Servidor
* [ejs] - View engine
* [require] - Simular requisições ao spoj
* [cheerio] - Navegar no html retornado pelas requisições
## Authors

* **Pedro Augusto**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
