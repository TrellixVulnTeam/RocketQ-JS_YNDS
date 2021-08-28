// a Function Modal foi exportada como módulo 
export default function Modal(){

    // pegando o botão cancelar da modal
    const cancelButton = document.querySelector('.button.cancel')

    const modalWrapper = document.querySelector('.modal-wrapper')

    cancelButton.addEventListener("click", close)

    function open(){
        // funcionalidade de atribuir a classe active para a modal
        // document.querySelector('.modal-wrapper').classList.add("active")
        modalWrapper.classList.add("active") //mesmo codigo da linha 13 porém otimizado
        
    }
    function close(){
        // funcionalidade de remover a classe active da modal
        // document.querySelector('.modal-wrapper').classList.remove("active")
        modalWrapper.classList.remove("active") //mesmo codigo da linha 19 porém otimizado
    }

    return{
        open,
        close
    }
}