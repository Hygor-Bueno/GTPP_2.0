export default class Modal {
  constructor () {
    const divTitle = document.createElement("div");
    
    this.modalDiv = null;
    this.callback = null;

    //Criação da div principal do modal
    this.modalDiv = document.createElement("div");
    this.modalDiv.className = "modal"
    this.modalDiv.id= 'testeModal'

    this.separatorDiv = document.createElement("div");
    this.separatorDiv.className = "separator";

    // conteudo do modelo
    this.modalContent = document.createElement("div");
    this.modalContent.className = "modal-content";
    
    // Criação do titulo do modal 
    this.title = document.createElement("h1");
    this.title.className = "title-modal";
    this.title.textContent = "Erro!!";
    
    // Criação de um botão de fechar
    this.btnClose = document.createElement("button");
    this.btnClose.className = "btn-close";
    this.btnClose.textContent = 'x';
    this.btnClose.onclick=() => {
      document.getElementById('testeModal').remove();
    }
    
    // Criação do paragrafo
    this.messageElement = document.createElement("p");
    this.messageElement.textContent = "Houve um erro por ai!!"
    
    
    this.modalDiv.appendChild(this.modalContent);
    this.modalContent.appendChild(this.btnClose);
    
    divTitle.appendChild(this.title);
    divTitle.appendChild(this.messageElement);
    this.separatorDiv.appendChild(this.modalDiv);
    this.modalContent.appendChild(divTitle);
    
    
    document.querySelector('section').appendChild(this.modalDiv);
  }

  OpenModal(titulo, mensagem, exibirBotoes) {
    this.title.textContent = titulo;
    this.messageElement.textContent = mensagem;
    this.btnClose.style.display = exibirBotoes;
    // this.modalDiv.style.display = 'block';

    this.modalDiv.classList.add('modal-absolute');

    return this.modalDiv;
  }
}