const Database = require('../db/config')

module.exports = {
    
    async index(req, res){
        const db = await Database()
        // quando quiser buscar algo do Front-end usa-se req.body | buscar algo do Back-end usa-se req.params
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        // para pegar o password a sintaxe é diferente
        const password = req.body.password

        // Verificar se a senha está correta 
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
        if(verifyRoom.pass == password){
            // verificar qual ação o usuário escolheu para a pergunta (Deletar/marcar como lida)
            if(action == "delete"){
                
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)

            }else if(action == "check"){

                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)

            }
            // comando de redirecionamento da página com o ID da room
            res.redirect(`/room/${roomId}`)
        } else {
            res.render('passincorrect', {roomId: roomId})
        }
        
    },

    async create(req, res){
        const db = await Database()
        const question = req.body.question
        const roomId = req.params.room

        await db.run(`INSERT INTO questions (
            title,
            room,
            read
        )VALUES(
            "${question}",
            ${roomId},
            0
        )`)

        res.redirect(`/room/${roomId}`)
    }
}
