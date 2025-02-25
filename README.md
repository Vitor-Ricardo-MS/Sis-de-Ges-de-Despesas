# Sis-De-Ges-De-Despesas 

## Descrição do projeto

Sistema de gestão de gastos residênciais, fullstack. 

## Funcionalidades

- Cadastro de pessoas;
- Cadastro de transações;
- Listagem das pessoas cadastradas;
- Listagem das transaçoẽs cadastradas;
- Listagem dos totais de receitas e despesas, assim como o saldo líquido de cada pessoa;
- Apresentação do total geral de receitas e despesas, assim como o saldo líquido geral.

## Layout da Aplicação

Uma página, dividida entre uma área de cadastro e listagem de pessoas e transações e uma área de listagem dos totais de receitas e despesas, assim como o saldo líquido.

## Arquitetura

Esse programa foi feito com uma arquitetura monolítica, baseada em um arquivo de rotas que inicia o site e uma pasta que contém o conteúdo apresentado no mesmo.

Detalhes da implementação:

- Implementação em [Python](https://www.python.org/downloads/);
- Uso do framework [Bottle](https://bottlepy.org/docs/dev/);
- Para dinamização da página, foi feito o uso da biblioteca [Socket.IO](https://socket.io/pt-br/);
- Banco de dados feito com arquivos JSON.

## Como rodar a aplicação

No terminal, clone o projeto: 
```
 $ git clone https://github.com/Vitor-Ricardo-MS/Sis-de-Ges-de-Despesas
```
Dentro do arquivo do sistema, rode o arquivo routes.py:
```
 $ python3 routes.py
```
Após isso, basta acessar o site através de "localhost:8080" no browser.









