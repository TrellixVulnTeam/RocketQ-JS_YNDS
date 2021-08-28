// import do express
const express = require('express')
const route = require('./route')
const path = require ('path')

const server = express()

// definindo a view engine a ser usada será a EJS
server.set('view engine', 'ejs')

// fazendo com que o express utilize o CSS utilizado nas telas
server.use(express.static("public"))

// mudando o diretório padrão dos arquivos EJS para "__dirname" (variável global) que é igual á "C:\GitHub\nlw-together\src\views"
server.set('views', path.join(__dirname, 'views'))

// (express: middleware) pegar o conteúdo do formulário e permitir que o controller possa manipulá-lo
server.use(express.urlencoded({extended: true}))

// após a importação de route, é necessário usar esse comando para usar
server.use(route)

// Arrow function "() =>" é uma forma simplificada de declarar uma função em JS muito utilizado pelos devs atuais
server.listen(3000, () => console.log("RODANDO"))


