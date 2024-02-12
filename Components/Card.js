import SimpleTask from "../Class/SimpleTask.js";
import Tasks from "../Class/Tasks.js";
import Button from "./Button.js";
import { CSVGenerator, PDFGenerator } from "./FileGenerator.js";
import Modal from "./Modal.js";
import { HamburgerX } from "./Hambuger.js";
import { Connection } from "../Connection/Connection.js";
import SVG from "./SVG.js";
import { SVGImageAnality, SVGImageArchived, SVGImageFlagInline, SVGImageOverview, SVGImageStopTask, SVGImageUser, SVGImageVerified } from "../Configuration/ImagesSVG.js";
import SuspendedTask from "../Class/SuspendedTask.js";

/**
 * @author Jonatas Silva
 * @class Card
 * @description Componente card que exibe e cria novas tarefas 
 * @example componenteTeste() => {
 *    const docTest = document.createElement("div");
 *    const card = new Card(this.#web);
 *    docTest.appendChild(card.createCard({ id: `task_state_1`, label: 'Nome do card', view: true }, getTask));
 * }
 * 
 */
export default class Card {
  #taskList = [];
  #getTasks = [];
  #getConfigId;
  #ws;
  constructor(ws) {
    this.#ws = ws;
  }

  async createCard(configs, tasks) {
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
  }

  getSubdivCard(configs, inputCheckbox) {
    const subDivCard = this.createSubDivCard(configs.label);
    subDivCard.appendChild(inputCheckbox);
    return subDivCard;
  }

  async createTaskElement(taskData) {
    const taskElement = document.createElement('div');
    const subBoxTaskElement = document.createElement('div');
    taskElement.setAttribute('draggable', 'true');
    taskElement.className = 'task';
    subBoxTaskElement.className = 'subTask';
    taskElement.dataset.taskid = taskData.id;
    taskElement.append(this.createElementDescriptionAndPriority(taskData), subBoxTaskElement);
    subBoxTaskElement.append(this.createdPercentTask(taskData), this.createTaskElementPriority(taskData), await this.createdUserElement(taskData))
    return taskElement;
  }

  createElementDescriptionAndPriority(taskData) {
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
  }

  createElementInicialDateAndFinalDate(local) {
    const taskElementDate = document.createElement('div');
    taskElementDate.appendChild(this.createElementDate(local));
    taskElementDate.className = 'task-date';
    return taskElementDate;
  }

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

  createArchivedTask(local) {
    const taskElementPriority = document.createElement('div');
    taskElementPriority.className = 'task-priority';
    taskElementPriority.classList.add("cursorPointer");
    taskElementPriority.appendChild(this.componentImage('archive.svg', 'arquivado'));
    return taskElementPriority;
  }

  createTaskElementPriority(local) {
    const taskElementPriority = document.createElement('div');
    taskElementPriority.className = 'task-priority';
    taskElementPriority.appendChild(this.getPriorityTextOrImage(local.priority || 0));
    return taskElementPriority;
  }

  async createdUserElement(local) {
    const taskElementPriority = document.createElement('div');
    taskElementPriority.className = 'task-priority';
    taskElementPriority.appendChild(await this.getUserImageAndColaboration(local));
    return taskElementPriority;
  }

  createdPercentTask(local) {
    const taskElementPriority = document.createElement('div');
    taskElementPriority.className = 'task-priority';
    taskElementPriority.appendChild(this.getPercent(local));
    return taskElementPriority;
  }


  createTaskElementDescription(local) {
    const maxLength = 5;
    const truncatedDescription = local?.description?.substring(0, maxLength) + (local?.description?.length > maxLength ? '...' : '');
    const tasksElementDescription = document.createElement('div');
    const htmlBold = document.createElement('b');
    const btn = new Button();
    
    tasksElementDescription.className = 'task-description';
    tasksElementDescription.title = local?.description;
    htmlBold.innerText = truncatedDescription || '';
    tasksElementDescription.appendChild(htmlBold);
    const loadSuspendedTasks = new SuspendedTask();
    tasksElementDescription.appendChild(btn.Button({type:'button',title:'Arquivar tarefa',onAction:()=> loadSuspendedTasks.suspended(local), description: this.visualComponentsSVG(local), classButton: 'btnFiled'}));
    return tasksElementDescription;
  }

  visualComponentsSVG(config) {
    const svg = new SVG();
    if(config.state_id == 1 || config.state_id == 2) return svg.createSvg(SVGImageArchived);
    if(config.state_id == 3) return svg.createSvg(SVGImageAnality); // svg de analise
    if(config.state_id == 4) return svg.createSvg(SVGImageStopTask); // svg de tarefa parada
    if(config.state_id == 5) return svg.createSvg(SVGImageOverview); // svg de bloqueado
    if(config.state_id == 6) return svg.createSvg(SVGImageVerified); // svg de Feito com sucesso

    return svg.createSvg(SVGImageArchived);
  }

  createSubDivCard(label) {
    const subCardDiv = document.createElement('div');
    subCardDiv.className = 'subdivcard';
    const title = document.createElement('h4');
    title.innerText = label;
    subCardDiv.appendChild(title);
    return subCardDiv;
  }

  createButtonHamburger(id) {
    const hamburger = new HamburgerX();
    return hamburger.createButton(id, (e) => this.handleList(e, id));
  }

  handleList(e, id) {
    const cardReturn = document.getElementById(id);
    e.target.checked ? this.openConfigCard(cardReturn, id) : this.closeConfigCard(id);
  }

  openConfigCard(local, id) {
    local.appendChild(this.createMenu(id));
  }

  closeConfigCard(id) {
    const menuReturn = document.querySelector(`#${id} .fatherMenu`);
    if (menuReturn) {
      menuReturn.remove();
    }
  }

  createMenu(id) {
    const button = new Button();
    const fatherMenu = document.createElement("div");
    fatherMenu.className = "fatherMenu";
    const cardMenu = document.createElement('div');
    cardMenu.className = 'menu';
    fatherMenu.appendChild(cardMenu);
    button.configButton(cardMenu, id, this.onPDF, this.onCSV, () => this.reloadTaskList(id));
    return fatherMenu;
  }

  /**
   * Função que gera uma pagina blank que traz os dados da tarefa e podemos imprimir ou salvar em PDF.
   * @date 2/5/2024 - 10:55:47 AM
   */
  onPDF = () => {
    const pdfGenerator = new PDFGenerator(this.#getTasks, this.#getConfigId);
    pdfGenerator.generatePDF();
    pdfGenerator.closeWindow();
  }

  /** Função que gera um arquivo CSV e faz o download para ser utilizando e importado para qualquer lugar.  */
  onCSV = () => {
    const csvGenerator = new CSVGenerator(this.#getTasks, this.#getConfigId);
    csvGenerator.generateCSV();
  }

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

  async loadTaskList() {
    const elementTask = document.getElementById('taskDiv');
    for (let i = 0; i < this.#taskList.length; i++) {
      elementTask.appendChild(await this.createTaskElement(this.#taskList[i]));
    }
    return elementTask;
  }

  componentImage(srcImage, title) {
    const image = document.createElement('img');
    image.className = 'img-task';
    title && (image.title = `${title}`);
    image.src = `../Assets/Image/${srcImage}`;
    return image;
  }

  getPriorityTextOrImage(priority) {
    const svg = new SVG();
      if (priority == 0) return svg.createSvg({...SVGImageFlagInline, fill: "#28A745"});
      if (priority == 1) return svg.createSvg({...SVGImageFlagInline, fill: "#F37518"});
      if (priority == 2) return svg.createSvg({...SVGImageFlagInline, fill: "#DC3545"});
  }

  async getUserImageAndColaboration(local) {
    const qtdUser = document.createElement('div');
    try {
      const svg = new SVG();
      qtdUser.className = 'qtd-user';
      const p = document.createElement('p');
      p.className = 'text';
      p.innerHTML = `${local.users ? local.users : 0}`;
      qtdUser.appendChild(p);
      qtdUser.appendChild(svg.createSvg(SVGImageUser));
    } catch (error) {
      console.error(error.message);
    }
    return qtdUser;
  }

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


  getPercent(local) {
    const percentDiv = document.createElement('p');
    percentDiv.className = 'percent';
    percentDiv.innerHTML = `${local.percent ? local.percent : 0}%`;
    return percentDiv;
  }
}