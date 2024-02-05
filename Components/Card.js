import SimpleTask from "../Class/SimpleTask.js";
import Tasks from "../Class/Tasks.js";
import Button from "./Button.js";
import { CSVGenerator, PDFGenerator } from "./FileGenerator.js";
import Modal from "./Modal.js";
import Util from "../Util.js";
import { HamburgerX } from "./Hambuger.js";

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

  createCard(configs, tasks) {
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
    for (let i = 0; i < this.#getTasks.length; i++) {
      const taskElement = this.createTaskElement(this.#getTasks[i]);
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

  createTaskElement(taskData) {
    const taskElement = document.createElement('div');
    const subBoxTaskElement = document.createElement('div');
    taskElement.setAttribute('draggable', 'true');
    taskElement.className = 'task';
    subBoxTaskElement.className = 'subTask';
    taskElement.dataset.taskid = taskData.id;

    taskElement.appendChild(this.createElementDescriptionAndPriority(taskData));
    taskElement.appendChild(subBoxTaskElement);
    subBoxTaskElement.appendChild(this.createTaskElementPriority(taskData));


    taskElement.addEventListener('click', async () => {
      const task = new Tasks(taskData, this.#ws);
      await task.getDetails();
      const modal = new Modal();
      modal.modalDark({ modal: task.taskElement() });
    });
    return taskElement;
  }

  createElementDescriptionAndPriority(taskData) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task-desc-priority';
    taskElement.appendChild(this.createTaskElementDescription(taskData));
    taskElement.appendChild(this.createElementInicialDateAndFinalDate(taskData));
    return taskElement;
  }

  createElementInicialDateAndFinalDate(local) {
    const taskElementDate = document.createElement('div');
    taskElementDate.appendChild(this.createElementDate(local.initial_date));
    taskElementDate.appendChild(this.createElementDate(local.final_date));
    taskElementDate.className = 'task-date';
    return taskElementDate;
  }

  createElementDate(date) {
    const taskElementInitialDate = document.createElement('div');
    taskElementInitialDate.innerText = `${date.split('-').reverse().join('/')}`;
    return taskElementInitialDate;
  }

  createTaskElementPriority(local) {
    const taskElementPriority = document.createElement('div');
    taskElementPriority.className = 'task-priority';
    taskElementPriority.appendChild(this.getPriorityText(local.priority || 0));
    return taskElementPriority;
  }

  createTaskElementDescription(local) {
    const maxLength = 15;
    const truncatedDescription = local?.description?.substring(0, maxLength) + (local?.description?.length > maxLength ? '...' : '');
    const tasksElementDescription = document.createElement('div');
    const htmlBold = document.createElement('b');
    tasksElementDescription.className = 'task-description';
    tasksElementDescription.title = local?.description;
    htmlBold.innerText = truncatedDescription || '';
    tasksElementDescription.appendChild(htmlBold);
    return tasksElementDescription;
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
       loadtask.registerModal(this.#taskList, local, () => console.log('ahahah'));
    } catch (e) {
      console.error(e);
    }
  }

  loadTaskList() {
    const elementTask = document.getElementById('taskDiv');
    for (let i = 0; i < this.#taskList.length; i++) {
      elementTask.appendChild(this.createTaskElement(this.#taskList[i]));
    }
    return elementTask;
  }

  componentImage(srcImage, title) {
    const image = document.createElement('img');
    title && (image.title = `${title}`);
    image.src = `../Assets/Image/${srcImage}`;
    return image;
  }

  getPriorityText(priority) {
    const titlePriority = ['Prioridade baixa', 'Prioridade media', 'Prioridade Alta'];
    return priority == 0 ? this.componentImage('eco.svg', titlePriority[0]) :
      priority == 1 ? this.componentImage('Warning.svg', titlePriority[1]) :
        priority == 2 ? this.componentImage('Alert.svg', titlePriority[2]) : null;
  }
}