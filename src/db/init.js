// importando o config.js do DB
const Database = require("./config")

const initDb = {
    // funções async/await para melhorar a performance de requisições sem precisar esperar o comando anterior terminar
    // no caso abaixo é necessário esperar(await) o "const db" carregar o que está sendo importado do Database pois sem ele o "db.exec não funcionará"
    async init(){
        const db = await Database()

        await db.exec(`CREATE TABLE rooms (
            id INTEGER PRIMARY KEY,
            pass STRING
        )`);

        await db.exec(`CREATE TABLE questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            read INT,
            room INT
        )`);
            
        // Ao abrir a conexão com o banco de dados e necessário fechar no final
        await db.close()
    }
}

// inicialização do Db
initDb.init();
