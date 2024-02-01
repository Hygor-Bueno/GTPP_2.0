import SimpleTask from "../Class/SimpleTask.js";
import Tasks from "../Class/Tasks.js";
import Button from "./Button.js";
import { CSVGenerator, PDFGenerator } from "./FileGenerator.js";
import Modal from "./Modal.js";
import Util from "../Util.js";
import { HamburgerX } from "./Hambuger.js";
import { Connection } from "../Connection/Connection.js";

/**
 * @author Jonatas Silva
 * @description classe card
 */
export default class Card {
  #taskList = [];
  #getTasks = [];
  #getConfigId;

  createCard(configs, tasks) {
    this.#getConfigId = configs.id;
    this.#getTasks = tasks;
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    if (configs?.id) cardDiv.id = configs.id;
    cardDiv.style.display = configs.view ? 'block' : 'none';
    const subDivCard = this.createSubDivCard(configs.label);
    const inputCheckbox = this.createButtonHamburger(configs.id);
    cardDiv.appendChild(subDivCard);
    subDivCard.appendChild(inputCheckbox);
    const taskDiv = document.createElement('div');
    taskDiv.id = 'taskDiv';
    for (let i = 0; i < this.#getTasks.length; i++) {
      const taskElement = this.createTaskElement(this.#getTasks[i]);
      if (configs.id === `task_state_${this.#getTasks[i].state_id}`) taskDiv.appendChild(taskElement);
    }
    cardDiv.appendChild(taskDiv);
    return cardDiv;
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
    

    taskElement.addEventListener('click', async() => {
      const task = new Tasks(taskData);
      await task.getDetails();
      const modal = new Modal();
      modal.modalDark(task.taskElement());
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
    const util = new Util();
    const taskElementInitialDate = document.createElement('div');
    taskElementInitialDate.innerText=`${util.formaDateUTF8(date)}`;
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
    return hamburger.createButton(id, (e) => this.handleList(e,id));
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

  onPDF = () => {
    const pdfGenerator = new PDFGenerator(this.#getTasks, this.#getConfigId);
    pdfGenerator.generatePDF();
    pdfGenerator.closeWindow();
  }

  onCSV = () => {
    const csvGenerator = new CSVGenerator(this.#getTasks, this.#getConfigId);
    csvGenerator.generateCSV();
  }

  moveToDoingTask() {
    console.log("passando para frente...");
  }

  reloadTaskList = (id) => {
    const isList = document.querySelector(`#${id} ul`);
    if (isList) {
      isList.remove();
    }
    const local = document.querySelector(`#${id}`);
    this.addTask(local);
  }

  // vamos fazer o adicionar tarefas no SimpleTask para que eu possa adicionar uma tarefa quando eu clicar no botão de adicionar 
  async addTask() {
     new SimpleTask();
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