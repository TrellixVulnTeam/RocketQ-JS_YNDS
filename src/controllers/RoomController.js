// import do Banco de dados (Db)
const Database = require("../db/config")

module.exports = {
    async create(req, res){
        // inicialização do DB no controllers
        const db = await Database()
        // inclusão do password vindo do create-pass.ejs
        const pass = req.body.password
        let roomId
        let isRoom = true

        while(isRoom){
            // Gerar o numero da sala de 6 dígitos
            for(var i =0; i < 6; i++){
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString()
            }
            // Verificação de número de sala duplicado
            const roomsExistIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)

            if(!isRoom){
                // inserção de dados na tabela 
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`)
            }
        }
        
        await db.close()

        // comando de redirecionamento da página com o ID da room
        res.redirect(`/room/${roomId}`)
    },

    // manipulação de exibição do codigo da sala no room.ejs (.open linkado ao routes.js)
    async open(req, res){
        const db = await Database()
        const roomId = req.params.room

        // Pegando as questões referentes ao código da sala no DataBase
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)

        // verificar se não tem nenhuma question na sala
        let isNoQuestions

        if(questions.length == 0){
            if(questionsRead.length == 0){
                isNoQuestions = true
            }
        }

        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
    },

    enter(req, res){

        const roomId = req.body.roomId
        res.redirect(`/room/${roomId}`)

    }
}