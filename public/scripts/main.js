import Modal from './modal.js'

const modal = Modal()

// selecionando as classes que serão alteradas na modal
const modalTitle = document.querySelector(".modal h2")
const modalDescription = document.querySelector(".modal p")
const modalButton = document.querySelector(".modal button")


// Pegar todos o botões que existe com a classe check
const checkButtons = document.querySelectorAll(".actions a.check")

// -------------- FORMA NORMAL ------------------------ //
// checkButtons.forEach(button => {
//     // adcionar a escuta
//     button.addEventListener("click", event =>{

//         // marcar a modal como lido
//         modalTitle.innerHTML = "Marcar como lida"

//         // abrir a modal
//         modal.open()
//     })
// })

// -------------- FORMA OTIMIZADA ---------------------- //
checkButtons.forEach(button => {
    // adcionar a escuta
    button.addEventListener("click", handleClick)

})

// Pegar todos o botões que existe com a classe delete
const deleteButtons = document.querySelectorAll(".actions a.delete")// quando o botão delete for clicado ele abre a modal

// -------------- FORMA NORMAL ------------------------ //
// deleteButtons.forEach(button => {
//     // adcionar a escuta
//     button.addEventListener("click", event =>{

//         // perguntar se deseja excluir
//         modalTitle.innerHTML = "Excluir pergunta"

//         // fechar a modal
//         modal.open()

//     })
// })

// -------------- FORMA OTIMIZADA ---------------------- //

deleteButtons.forEach(button => {
    // adcionar a escuta
    // button.addEventListener("click", handleClick(event, check = false)) --> é necessário passar "(event) =>" como conversor para usar o "event"
     button.addEventListener("click", (event) => handleClick(event, false))
})

function handleClick(event, check = true){
    // remover a alteração de URL
    event.preventDefault()

    // sempre que um ou mais elemento repetir procure gardar em VARIÁVEIS para REUTILIZAR isso ajuda no desempenho da aplicação
    const text = check ? "Marcar como lida" : "Excluir"
    const slug = check ? "check" : "delete"

    // selecionando o room-id 
    const roomId = document.querySelector("#room-id").dataset.id

    // selecionando cada questão pelo seu ID usando o event por que o evento "click" retorna as informações necessárias
    const questionID = event.target.dataset.id

    // selecionando a form da modal
    const form = document.querySelector(".modal form")
    // mudando o atributo(link) da modal
    form.setAttribute("action", `/question/${roomId}/${questionID}/${slug}`)

    modalTitle.innerHTML= `${text} esta pergunta`
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red")

    //abrir modal
    modal.open()
}
