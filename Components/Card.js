import SimpleTask from "../Class/SimpleTask.js";
import Tasks from "../Class/Tasks.js";
import Button from "./Button.js";
import { CSVGenerator, PDFGenerator } from "./FileGenerator.js";
import Modal from "./Modal.js";
import { HamburgerX } from "./Hambuger.js";
import { Connection } from "../Connection/Connection.js";
import SVG from "./SVG.js";
import { SVGImageArchived, SVGImageFlagInline, SVGImageUser } from "../Configuration/ImagesSVG.js";
import SuspendedTask from "../Class/SuspendedTask.js";

/**
 * Classe que representa um cartão de tarefa.
 */
export default class Card {
  #taskList = [];
  #getTasks = [];
  colorBD = [];
  #getConfigId;
  #ws;
   /**
   * Cria uma nova instância de Card.
   * @param {Object} ws - Objeto WebSocket.
   */
  constructor(ws) {
    this.#ws = ws;
  }

  /**
   * Cria um cartão de tarefa.
   * @param {Object} configs - Configurações do cartão.
   * @param {number} configs.id - ID do cartão.
   * @param {boolean} configs.view - Visualização do cartão.
   * @param {string} configs.label - Rótulo do cartão.
   * @param {Array} tasks - Lista de tarefas do cartão.
   * @param {Array} listTaskState - Lista de estados da tarefa.
   * @returns {HTMLElement} - Elemento HTML do cartão.
   */
  async createCard(configs, tasks, listTaskState) {
    try {
      this.colorBD = listTaskState;
      this.#getConfigId = configs.id;
      this.#getTasks = tasks;
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card';
      cardDiv.style.display = configs.view ? 'block' : 'none';
      if (configs?.id) cardDiv.id = configs.id;
      const inputCheckbox = this.createButtonHamburger(configs.id);
      cardDiv.appendChild(this.getSubdivCard(configs, inputCheckbox));
      const taskDiv = document.createElement('div');
      taskDiv.id = 'taskDiv';
      taskDiv.className='column'
      for (let i = 0; i < this.#getTasks.length; i++) {
        const taskElement = await this.createTaskElement(this.#getTasks[i]);
        if (configs.id === `task_state_${this.#getTasks[i].state_id}`) taskDiv.appendChild(taskElement);
      }
      cardDiv.appendChild(taskDiv);
      return cardDiv;
    } catch (error) {
      console.error(error.message);
    }
  }
  /**
   * Cria um sub-div do cartão.
   * @param {Object} configs - Configurações do cartão.
   * @param {string} inputCheckbox - Checkbox do cartão.
   * @returns {HTMLElement} - Sub-div do cartão.
   */
  getSubdivCard(configs, inputCheckbox) {
    try {
      const subDivCard = this.createSubDivCard(configs.label);
      subDivCard.appendChild(inputCheckbox);
      return subDivCard;
    } catch (error) {
      console.error(error.message);
    }
  }
  /**
   * Cria um elemento de tarefa.
   * @param {Object} taskData - Dados da tarefa.
   * @returns {HTMLElement} - Elemento HTML da tarefa.
   */
  async createTaskElement(taskData) {
    try {
      const taskElement = document.createElement('div');
      const subBoxTaskElement = document.createElement('div');
      taskElement.setAttribute('draggable', 'true');
      taskElement.className = 'task';
      subBoxTaskElement.className = 'subTask';
      taskElement.dataset.taskid = taskData.id;
      taskElement.append(this.createElementDescriptionAndPriority(taskData), subBoxTaskElement);
      subBoxTaskElement.append(this.createdPercentTask(taskData), this.createTaskElementPriority(taskData), await this.createdUserElement(taskData))
      return taskElement;
    } catch (error) {
      console.error(error.message);
    }
  }
  /**
   * Cria um elemento de descrição e prioridade da tarefa.
   * @param {Object} taskData - Dados da tarefa.
   * @returns {HTMLElement} - Elemento HTML da descrição e prioridade.
   */
  createElementDescriptionAndPriority(taskData) {
    try {
      const taskElement = document.createElement('div');
      taskElement.className = 'task-desc-priority';
      taskElement.append(this.createTaskElementDescription(taskData), this.createElementInicialDateAndFinalDate(taskData));
      taskElement.addEventListener('click', async (e) => {
        if (e.target.tagName !== 'BUTTON' && e.target.closest('button') === null) {
          const task = new Tasks(taskData, this.#ws);
          await task.getDetails();
          const modal = new Modal();
          modal.modalDark({ modal: task.taskElement() });
        }
      });
      return taskElement;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Cria um elemento de data inicial e final da tarefa.
   * @param {Object} date - Dados da data da tarefa.
   * @returns {HTMLElement} - Elemento HTML da data da tarefa.
   */
  createElementDate(date) {
    try {
      const taskElementInitialDate = document.createElement('div');
      taskElementInitialDate.className = 'dateTasks'
      date && taskElementInitialDate.append(this.getDateInit(date.initial_date), this.getDateFinal(date.final_date));
      return taskElementInitialDate;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Cria um elemento de data inicial da tarefa.
   * @param {string} initialDate - Data inicial da tarefa.
   * @returns {HTMLElement} - Elemento HTML da data inicial da tarefa.
   */
  getDateInit(initialDate) {
    try {
      const divDt = document.createElement('div');
      const label = document.createElement('label');
      label.innerText = 'Data inicial';
      const span = document.createElement('span');
      span.innerText = `${initialDate.split('-').reverse().join('/')}`;
      divDt.appendChild(label);
      divDt.appendChild(span);
      return divDt;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Cria um elemento de data final da tarefa.
   * @param {string} finalDate - Data final da tarefa.
   * @returns {HTMLElement} - Elemento HTML da data final da tarefa.
   */
  getDateFinal(initialDate) {
    try {
      const div = document.createElement('div');
      const label = document.createElement('label');
      label.innerText = 'Data final';
      const span = document.createElement('span');
      span.innerText = `${initialDate.split('-').reverse().join('/')}`;
      div.append(label, span);
      return div;
    } catch (error) {
      console.error(error.message);
    }
  }

  createElementInicialDateAndFinalDate(local) {
    try {
      const taskElementDate = document.createElement('div');
      taskElementDate.appendChild(this.createElementDate(local));
      taskElementDate.className = 'task-date';
      return taskElementDate;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Cria um elemento de prioridade da tarefa.
   * @param {Object} local - Dados da prioridade da tarefa.
   * @returns {HTMLElement} - Elemento HTML da prioridade da tarefa.
   */
  createTaskElementPriority(local) {
    try {
      const taskElementPriority = document.createElement('div');
      taskElementPriority.className = 'task-priority';
      taskElementPriority.appendChild(this.getPriorityTextOrImage(local.priority || 0));
      return taskElementPriority;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Cria um elemento de colaborador da tarefa.
   * @param {Object} local - Dados do colaborador da tarefa.
   * @returns {HTMLElement} - Elemento HTML do colaborador da tarefa.
   */
  async createdUserElement(local) {
    try {
      const taskElementPriority = document.createElement('div');
      taskElementPriority.className = 'task-priority';
      taskElementPriority.appendChild(await this.getUserImageAndColaboration(local));
      return taskElementPriority;
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
   * Cria um elemento de descrição da tarefa.
   * @param {Object} local - Dados da tarefa.
   * @returns {HTMLElement} - Elemento HTML da descrição da tarefa.
   */
  createTaskElementDescription(local) {
    try {
      const tasksElementDescription = document.createElement('div');
      const htmlBold = document.createElement('b');
      tasksElementDescription.className = 'task-description';
      tasksElementDescription.title = local.description;
      htmlBold.innerText = local.description || '';
      tasksElementDescription.appendChild(htmlBold);
      this.visualComponentsButton(local, tasksElementDescription);   
      return tasksElementDescription;
    } catch (error) {
      console.error(error.message);
    }
  }
  
  /**
   * Visualiza componentes de botão.
   * @param {Object} config - Configurações do botão.
   * @param {HTMLElement} localElement - Elemento HTML local onde o botão será inserido.
   */
  visualComponentsButton(config, localElement) {
    try {
      const svg = new SVG();
      const loadSuspendedTasks = new SuspendedTask(this.colorBD);
      const btn = new Button();
      if(config.state_id == 1 || config.state_id == 2) {
        localElement.appendChild(
          btn.Button({type:'button',title:'Arquivar tarefa',onAction:()=> loadSuspendedTasks.suspended(config),
          description: svg.createSvg(SVGImageArchived), classButton: 'btnFiled'}))
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
   * Função que gera uma página em branco que traz os dados da tarefa e pode ser impressa ou salva em PDF.
   */
  onPDF = () => {
    try {
      const pdfGenerator = new PDFGenerator(this.#getTasks, this.#getConfigId);
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
      const csvGenerator = new CSVGenerator(this.#getTasks, this.#getConfigId);
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
      loadtask.registerModal(this.#taskList, local, async () => await this.loadTaskList());
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
      for (let i = 0; i < this.#taskList.length; i++) {
        elementTask.appendChild(await this.createTaskElement(this.#taskList[i]));
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
   * Obtém os usuários associados à tarefa.
   * @param {Object} local - Dados da tarefa.
   * @returns {Object} - Usuários associados à tarefa.
   */
  async getUser(local) {
    try {
      const connection = new Connection();
      let result = await connection.get(`&task_id=${local.id}&list_user=0`, 'GTPP/Task_User.php');
      if (!result.error) {
        return result;
      }
    } catch (error) {
      throw new Error('Failed to fetch user: ' + error.message);
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
}