export default class Modal {
  constructor () {
    this.modalDiv = null;
    this.callback = null;

    //Criação da div principal do modal
    this.modalDiv = document.createElement("div");
    this.modalDiv.className = "modal"

    this.separatorDiv = document.createElement("div");
    this.separatorDiv.className = "separator";

    // conteudo do modelo
    this.modalContent = document.createElement("div");
    this.modalContent.className = "modal-content";

    const divTitle = document.createElement("div");

    // Criação do titulo do modal 
    this.title = document.createElement("h1");
    this.title.className = "title-modal";
    this.title.innerText = "Erro!!";

    // Criação de um botão de fechar
    this.btnClose = document.createElement("span");
    this.btnClose.className = "btn-close";
    this.btnClose.innerHTML = '&times;';
    this.btnClose.onclick=() => {
      this.btnClose(false);
    }

    // Criação do paragrafo
    this.messageElement = document.createElement("p");
    this.messageElement.textContent = "Houve um erro por ai!!"

    divTitle.appendChild(this.title);
    divTitle.appendChild(this.messageElement);
  
    this.modalDiv.appendChild(this.modalContent);
    this.separatorDiv.appendChild(this.modalDiv);

    this.modalContent.appendChild(this.btnClose);
    //this.modalContent.appendChild(this.messageElement);
    this.modalContent.appendChild(divTitle);

    document.querySelector('section').appendChild(this.modalDiv);

  }

  showError(mensagem) {
    this.abrirModal('Erro', mensagem, false);
  }

  showConfirmation(mensagem, callback) {
      this.callback = callback;
      this.abrirModal('Confirmação', mensagem, true);
  }

  OpenModal(titulo, mensagem, exibirBotoes) {
    this.messageElement.textContent = mensagem;
    this.btnClose.style.display = exibirBotoes ? 'block' : 'none';

    this.modalDiv.style.display = 'block';
  }


  CloseModal(resultado) {
      this.modalDiv.style.display = 'none';

      if (this.callback) {
          this.callback(resultado);
          this.callback = null;
      }
  }
}