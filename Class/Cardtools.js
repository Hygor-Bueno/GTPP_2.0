import SVG from "../Components/SVG.js";
import { CSVGenerator, PDFGenerator } from "../Components/FileGenerator.js";
import { SVGImageFlagInline, SVGImageUser } from "../Configuration/ImagesSVG.js";
import { HamburgerX } from "../Components/Hambuger.js";
import Button from "../Components/Button.js";

export default class CardTools {
  percentual;

  /**
   * Obtém a imagem e a colaboração do usuário.
   * @param {number} numberCollaboration Dados do usuário.
   */
  async getUserImage(numberCollaboration) {
    const qtdUser = document.createElement('div');
    try {
      const svg = new SVG();
      qtdUser.className = 'qtd-user';
      const p = document.createElement('p');
      p.className = 'text';
      p.innerHTML = `${numberCollaboration ? numberCollaboration : 0}`;
      qtdUser.append(p, svg.createSvg(SVGImageUser));
    } catch (error) {
      console.error(error.message);
    }
    return qtdUser;
  }

  /**
   * faz a criação de uma imagem SVG com de acordo com o nivel de prioridade.
   * @param {number} priority - Prioridade da tarefa.
   * @returns {SVGElement}
   */
  getPriorityTextOrImage(priority) {
    try {
      const svg = new SVG();
      if (priority == 0) return svg.createSvg({...SVGImageFlagInline, fill: "#28A745"});
      if (priority == 1) return svg.createSvg({...SVGImageFlagInline, fill: "#F37518"});
      if (priority == 2) return svg.createSvg({...SVGImageFlagInline, fill: "#DC3545"});
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Cria um elemento de porcentagem de conclusão da tarefa.
   * @param {{percent:number;id:number;}} config Dados da tarefa.
   */
  createdPercentTask(config) {
    try {
      const taskElementPriority = document.createElement('div');
      const percentDiv = document.createElement('p');
      percentDiv.id = `percent_task_${config.id}`;
      percentDiv.className = 'percent';
      percentDiv.innerText = `${config.percent == undefined ? 0 : config.percent}%`;
      taskElementPriority.className = 'task-priority';
      taskElementPriority.appendChild(percentDiv);
      return taskElementPriority;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Cria um botão Hamburger para o cartão.
   * @param {string} id - ID do cartão.
   * @returns {HTMLButtonElement}
   */
  createButtonHamburger(id) {
    try {  
      const hamburger = new HamburgerX();
      return hamburger.createButton(id, (e) => this.handleList(e, id));
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Manipula a lista do cartão.
   * @param {Event} event - Evento de clique.
   * @param {string} id - ID do cartão.
   */
  handleList(event, id) {
    try {
      const cardReturn = document.getElementById(`task_state_${id}`);
      event.target.checked ? cardReturn.appendChild(this.createMenu(id)) : this.closeConfigCard(id);
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Cria um menu para o cartão.
   * @param {string} id - ID do cartão.
   */
  createMenu(id) {
    try {
      const button = new Button();
      const fatherMenu = document.createElement("div");
      fatherMenu.className = "fatherMenu";
      const cardMenu = document.createElement('div');
      cardMenu.className = 'menu';
      fatherMenu.appendChild(cardMenu);
     button.configButton(cardMenu, `task_state_${id}`, () => this.onPDF() , () => this.onCSV(), () => this.reloadTaskList(id));
      return fatherMenu;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Fecha o menu de configuração do cartão.
   * @param {string} id - ID do cartão.
   */
  closeConfigCard(id) {
    try {
      const menuReturn = document.querySelector(`#task_state_${id} .fatherMenu`);
      if (menuReturn) {
        menuReturn.remove();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

    /**
     * Cria um sub-div do cartão.
     * @param {string} label - Rótulo do cartão.
     * @returns {HTMLElement} - Sub-div do cartão.
     */
    createSubDivCard(label) {
      try {
        const subCardDiv = document.createElement('div');
        subCardDiv.className = 'subdivcard';
        const title = document.createElement('h4');
        title.innerText = label;
        subCardDiv.appendChild(title);
        return subCardDiv;
      } catch (error) {
        console.error(error.message);
      }
    }

    /**
    * Gerador de pdf
    * @return {void}
    */
    onPDF() {
      try {
        const pdfGenerator = new PDFGenerator(this.getTasks, this.getConfigId);
        pdfGenerator.generatePDF();
        pdfGenerator.closeWindow();
      } catch (error) {
        console.error(error.message);
      }
    }
  
    /**
     * Gerador de CSV
     * @return {void}
     */
    onCSV() {
      try {
        const csvGenerator = new CSVGenerator(this.getTasks, this.getConfigId);
        csvGenerator.generateCSV(); 
      } catch (error) {
        console.error(error.message);
      }
    }
}