import SVG from "../Components/SVG.js";
import SimpleTask from "./SimpleTask.js";
import { CSVGenerator, PDFGenerator } from "../Components/FileGenerator.js";
import { SVGImageFlagInline, SVGImageUser } from "../Configuration/ImagesSVG.js";
import { HamburgerX } from "../Components/Hambuger.js";
import Button from "../Components/Button.js";

export default class CardSimple {
  /**
   * Obtém a imagem e a colaboração do usuário.
   * @param {Object} local - Dados do usuário.
   * @returns {HTMLElement} - Imagem e colaboração do usuário.
   */
  async getUserImageAndColaboration(local) {
    const qtdUser = document.createElement('div');
    try {
      const svg = new SVG();
      qtdUser.className = 'qtd-user';
      const p = document.createElement('p');
      p.className = 'text';
      p.innerHTML = `${local.users ? local.users : 0}`;
      qtdUser.append(p, svg.createSvg(SVGImageUser));
    } catch (error) {
      console.error(error.message);
    }
    return qtdUser;
  }

  /**
   * Obtém o texto ou imagem da prioridade da tarefa.
   * @param {number} priority - Prioridade da tarefa.
   * @returns {HTMLElement} - Texto ou imagem da prioridade.
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
   * @param {Object} local - Dados da tarefa.
   * @returns {HTMLElement} - Elemento HTML da porcentagem de conclusão da tarefa.
   */
  createdPercentTask(local) {
    try {
      const taskElementPriority = document.createElement('div');
      taskElementPriority.className = 'task-priority';
      taskElementPriority.appendChild(this.getPercent(local));
      return taskElementPriority;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Obtém a porcentagem de conclusão da tarefa.
   * @param {Object} local - Dados da tarefa.
   * @returns {HTMLElement} - Porcentagem de conclusão da tarefa.
   */
  getPercent(local) {
    try {
      const percentDiv = document.createElement('p');
      percentDiv.className = 'percent';
      percentDiv.innerHTML = `${local.percent ? local.percent : 0}%`;
      return percentDiv;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Cria um botão Hamburger para o cartão.
   * @param {string} id - ID do cartão.
   * @returns {HTMLElement} - Botão Hamburger do cartão.
   */
  createButtonHamburger(id) {
    try {  
      const hamburger = new HamburgerX();
      return hamburger.createButton(id, (e) => this.handleList(e, id));
    } catch (error) {
      console.error(error.message);s
    }
  }

  /**
   * Manipula a lista do cartão.
   * @param {Event} e - Evento de clique.
   * @param {string} id - ID do cartão.
   */
  handleList(e, id) {
    try {
      const cardReturn = document.getElementById(id);
      e.target.checked ? this.openConfigCard(cardReturn, id) : this.closeConfigCard(id);
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Cria um menu para o cartão.
   * @param {string} id - ID do cartão.
   * @returns {HTMLElement} - Menu do cartão.
   */
  createMenu(id) {
    try {
      const button = new Button();
      const fatherMenu = document.createElement("div");
      fatherMenu.className = "fatherMenu";
      const cardMenu = document.createElement('div');
      cardMenu.className = 'menu';
      fatherMenu.appendChild(cardMenu);
      button.configButton(cardMenu, id, this.onPDF, this.onCSV, () => this.reloadTaskList(id));
      return fatherMenu;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Abre o menu de configuração do cartão.
   * @param {HTMLElement} local - Elemento HTML local do cartão.
   * @param {string} id - ID do cartão.
   */
  openConfigCard(local, id) {
    try {
      local.appendChild(this.createMenu(id));
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
      const menuReturn = document.querySelector(`#${id} .fatherMenu`);
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
   * Função que gera uma página em branco que traz os dados da tarefa e pode ser impressa ou salva em PDF.
   */
    onPDF = () => {
      try {
        const pdfGenerator = new PDFGenerator(this.getTasks, this.getConfigId);
        pdfGenerator.generatePDF();
        pdfGenerator.closeWindow();
      } catch (error) {
        console.error(error.message);
      }
    }
  
    /**
     * Função que gera um arquivo CSV e faz o download para ser utilizado e importado em qualquer lugar.
     */
    onCSV = () => {
      try {
        const csvGenerator = new CSVGenerator(this.getTasks, this.getConfigId);
        csvGenerator.generateCSV(); 
      } catch (error) {
        console.error(error.message);
      }
    }
  
    /**
     * Recarrega a lista de tarefas do cartão.
     * @param {string} id - ID do cartão.
     */
    reloadTaskList = (id) => {
      try {
        const isList = document.querySelector(`#${id} ul`);
        if (isList) {
          isList.remove();
        }
        const local = document.querySelector(`#${id}`);
  
        const loadtask = new SimpleTask();
        loadtask.registerModal(this.taskList, local, async () => await this.loadTaskList());
      } catch (e) {
        console.error(e);
      }
    }
  
    /**
     * Carrega a lista de tarefas do cartão.
     * @returns {HTMLElement} - Elemento HTML da lista de tarefas.
     */
    async loadTaskList() {
      try {
        const elementTask = document.getElementById('taskDiv');
        for (let i = 0; i < this.taskList.length; i++) {
          elementTask.appendChild(await this.createTaskElement(this.taskList[i]));
        }
        return elementTask;
      } catch (error) {
        console.error(error.message);
      }
    }
  
    /**
     * Cria um componente de imagem.
     * @param {string} srcImage - Caminho da imagem.
     * @param {string} title - Título da imagem.
     * @returns {HTMLImageElement} - Componente de imagem.
     */
    componentImage(srcImage, title) {
      try {
        const image = document.createElement('img');
        image.className = 'img-task';
        title && (image.title = `${title}`);
        image.src = `../Assets/Image/${srcImage}`;
        return image;
      } catch (error) {
        console.error(error.message);
      }
    }
}