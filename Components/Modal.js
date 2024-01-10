//import { buttonLogin } from "../Configuration/Configuration";
import Button from "./Button.js";
import {buttonCloseModal} from "../Configuration/Configuration.js";

/**
 * Classe Modal
 * @class
 * @classdesc Representa um componente modal simples para exibir mensagens.
 */
export default class Modal {
  /**
   * Cria um novo elemento de modal.
   * @public
   * @returns {HTMLElement} O elemento do modal criado.
   */
  createModal() {

    // criação do divisor modal
    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal';
    modalDiv.id = 'ModalReturn';

    // criação do divisor separator
    const separatorDiv = document.createElement('div');
    separatorDiv.className = 'separator';

    // criação do modal-content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';    

    // pega os components Title e paragraph 
    const divTitle = this.createTitleElement();
    const messageElement = this.createMessageElement();


    // aplicando os elementos
    modalDiv.appendChild(modalContent);
    modalContent.appendChild(this.closeModal());
    divTitle.appendChild(messageElement);
    separatorDiv.appendChild(modalDiv);
    modalContent.appendChild(divTitle);

    return modalDiv;
  }

  /**
   * @extends Button está estendendo as funções que precisamos para criar um componente de botão.
   * @returns {HTMLButtonElement} retorna um botão para fechar o modal
   */
  closeModal() {
    const btnClose = new Button();
    let configBtn = buttonCloseModal;
    configBtn.onAction = () => document.getElementById('ModalReturn').remove();
    return btnClose.Button(configBtn);
  }

  /**
   * Cria um novo elemento de título para o modal.
   * @public
   * @returns {HTMLElement} O elemento do título criado.
   */
  createTitleElement() {
    const divTitle = document.createElement('div');
    divTitle.className = 'title-modal';

    const title = document.createElement('h1');
    divTitle.appendChild(title);

    return divTitle;
  }

  /**
   * Cria um novo elemento de mensagem para o modal.
   * @public
   * @returns {HTMLElement} O elemento de mensagem criado.
   */
  createMessageElement() {
    return document.createElement('p');
  }

  /**
   * Abre o modal com o título, mensagem e local fornecidos.
   * @param {string} titulo - O título do modal.
   * @param {string} mensagem - A mensagem a ser exibida no modal.
   * @param {HTMLElement} local - O elemento DOM onde o modal será anexado.
   */
  openModal(titulo, mensagem, local) {
    // Obtém uma referencia ao modal existente, se houver, ID 'ModalReturn'
    const modalExistente = document.getElementById('ModalReturn');

    // Verificar se o modal ainda não existe na DOM
    if (!modalExistente) {

      // Cria um novo elemento DIV para representar o modal.
      const modalDiv = this.createModal();

      // Define o conteúdo do modal com base nos parâmetros fornecidos
      modalDiv.querySelector('.title-modal h1').textContent = titulo;
      modalDiv.querySelector('.modal-content p').textContent = mensagem;

      // Adiciona classe para posicionar o modal
      modalDiv.classList.add('modal-absolute');

      // Anexa o modal a um certo local fornecido na DOM
      local.appendChild(modalDiv);
    }
  }
}