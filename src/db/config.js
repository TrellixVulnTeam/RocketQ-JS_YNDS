// importações sqlite e sqlite3
const sqlite3 = require("sqlite3")
// importou apenas o "open" do sqlite
const { open } = require("sqlite")

module.exports = () =>
    open({
        // caminho para o banco de dados
        filename: './src/db/rocketq.sqlite',
        driver: sqlite3.Database,
    })
