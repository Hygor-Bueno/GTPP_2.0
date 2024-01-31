import SimpleTask from "../Class/SimpleTask.js";
import Tasks from "../Class/Tasks.js";
import { buttonAdd, buttonCSV, buttonPDF } from "../Configuration/Configuration.js";
import Button from "./Button.js";
import { CSVGenerator, PDFGenerator } from "./FileGenerator.js";
import Modal from "./Modal.js";
import { Connection } from "../Connection/Connection.js";
import Util from "../Util.js";

/**
 * Classe Card
 * @author Jonatas silva.
 * 
 * Esta classe é responsável por criar e gerenciar os cards de tarefas.
 */
export default class Card {
  #taskList = [];
  #getTasks = [];
  #getConfigId;
  #ws;
  constructor(ws){
    this.#ws = ws;
  }

  /**
   * Método createCard
   * Cria um card com base nas configurações e tarefas fornecidas.
   * @param {Object} configs - Configurações do card.
   * @param {Array} tasks - Lista de tarefas associadas ao card.
   * @returns {HTMLDivElement} - Elemento HTML do card criado.
   */
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
      if (configs.id === `task_state_${this.#getTasks[i].state_id}`) {
        taskDiv.appendChild(taskElement);
      }
    }

    cardDiv.appendChild(taskDiv);
    return cardDiv;
  }

  /**
   * Método createTaskElement
   * Cria um elemento de tarefa com base nos dados fornecidos.
   * @param {Object} taskData - Dados da tarefa.
   * @returns {HTMLDivElement} - Elemento HTML da tarefa criada.
   */
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
      const task = new Tasks(taskData,this.#ws);
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

  /**
   * Método createElementInicialDateAndFinalDate
   * Cria um elemento para exibição de datas iniciais e finais da tarefa.
   * @param {Object} local - Dados da tarefa.
   * @returns {HTMLDivElement} - Elemento HTML para datas.
   */
  createElementInicialDateAndFinalDate(local) {
    const util = new Util();
    const initalDate = new Date(local.initial_date);
    const finalDate = new Date(local.final_date);
    const taskElementDate = document.createElement('div');
    const taskElementInitialDate = document.createElement('div');
    taskElementInitialDate.innerText=`${util.formaDateUTF8(initalDate)}`;
    const taskElementFinalData = document.createElement('div');
    taskElementFinalData.innerText = `${util.formaDateUTF8(finalDate)}`;
    taskElementDate.appendChild(taskElementInitialDate);
    taskElementDate.appendChild(taskElementFinalData);
    taskElementDate.className = 'task-date';
    return taskElementDate;
  }

  /**
   * Método createTaskElementPriority
   * Cria um elemento para exibição da prioridade da tarefa.
   * @param {Object} local - Dados da tarefa.
   * @returns {HTMLDivElement} - Elemento HTML para prioridade.
   */
  createTaskElementPriority(local) {
    const taskElementPriority = document.createElement('div');
    taskElementPriority.className = 'task-priority';
    taskElementPriority.innerHTML = `${this.getPriorityText(local.priority)}`;
    return taskElementPriority;
  }

  /**
   * Método createTaskElementDescription
   * Cria um elemento para exibição da descrição da tarefa.
   * @param {Object} local - Dados da tarefa.
   * @returns {HTMLDivElement} - Elemento HTML para descrição.
   */
  createTaskElementDescription(local) {
    const tasksElementDescription = document.createElement('div');
    tasksElementDescription.className = 'task-description';
    tasksElementDescription.title = local.description;
    const maxLength = 15;
   
    const truncatedDescription = local?.description && local.description.substring(0, maxLength) + `${local.description.length >maxLength ? '...':''}`
    tasksElementDescription.innerHTML = `<b>${truncatedDescription}</b>`;
    return tasksElementDescription;
  }

  /**
   * Método createSubDivCard
   * Cria um elemento de sub-divisão para o card.
   * @param {string} label - Rótulo do card.
   * @returns {HTMLDivElement} - Elemento HTML de sub-divisão.
   */
  createSubDivCard(label) {
    const subCardDiv = document.createElement('div');
    subCardDiv.className = 'subdivcard';
    const title = document.createElement('h4');
    title.innerText = label;
    subCardDiv.appendChild(title);
    return subCardDiv;
  }

  /**
   * Método createButtonHamburger
   * Cria um botão de menu (hamburger) para o card.
   * @param {string} id - Identificador do card.
   * @returns {HTMLDivElement} - Elemento HTML do botão hamburger.
   */
  createButtonHamburger(id) {
    const fatherNav = document.createElement('nav');
    fatherNav.className = 'fatherNav';
    const inputHamburger = document.createElement('input');
    inputHamburger.id = `dropdown_${id}`;
    inputHamburger.className = 'input-box';
    inputHamburger.style = "display: none;";
    inputHamburger.type = 'checkbox';
    inputHamburger.checked = false;
    const label = document.createElement('label');
    label.setAttribute("for", `dropdown_${id}`);
    label.className = 'dropdown';
    const spanHamburger = document.createElement('span');
    spanHamburger.className = 'hamburger';
    const spanIconBar1 = document.createElement('span');
    spanIconBar1.className = 'icon-bar top-bar';
    const spanIconBar2 = document.createElement('span');
    spanIconBar2.className = 'icon-bar middle-bar';
    const spanIconBar3 = document.createElement('span');
    spanIconBar3.className = 'icon-bar bottom-bar';

    fatherNav.appendChild(inputHamburger);
    fatherNav.appendChild(label);

    label.appendChild(spanHamburger);
    label.appendChild(spanIconBar1);
    label.appendChild(spanIconBar2);
    label.appendChild(spanIconBar3);

    inputHamburger.addEventListener('click', (e) => {
      const cardReturn = document.getElementById(id);
      e.target.checked ? this.openConfigCard(cardReturn, id) : this.closeConfigCard(id);
    });

    return fatherNav;
  }

  /**
   * Método openConfigCard
   * Abre o menu de configuração do card.
   * @param {HTMLDivElement} local - Elemento HTML do card.
   * @param {string} id - Identificador do card.
   */
  openConfigCard(local, id) {
    local.appendChild(this.createMenu(id));
  }

  /**
   * Método closeConfigCard
   * Fecha o menu de configuração do card.
   * @param {string} id - Identificador do card.
   */
  closeConfigCard(id) {
    const menuReturn = document.querySelector(`#${id} .fatherMenu`);
    if (menuReturn) {
      menuReturn.remove();
    }
  }

  /**
   * Método createMenu
   * Cria o menu de configuração do card.
   * @param {string} id - Identificador do card.
   * @returns {HTMLDivElement} - Elemento HTML do menu de configuração.
   */
  createMenu(id) {
    const fatherMenu = document.createElement("div");
    fatherMenu.className = "fatherMenu";
    const cardMenu = document.createElement('div');
    cardMenu.className = 'menu';
    fatherMenu.appendChild(cardMenu);
    this.configButton(cardMenu, id);
    return fatherMenu;
  }

  /**
   * Método onPDF
   * Aciona a geração de um arquivo PDF com base nas tarefas do card.
   */
  onPDF() {
    const pdfGenerator = new PDFGenerator(this.#getTasks, this.#getConfigId);
    pdfGenerator.generatePDF();
    pdfGenerator.closeWindow();
  }

  /**
   * Método onCSV
   * Aciona a geração de um arquivo CSV com base nas tarefas do card.
   */
  onCSV() {
    const csvGenerator = new CSVGenerator(this.#getTasks, this.#getConfigId);
    csvGenerator.generateCSV();
  }

  /**
   * Método moveToDoingTask
   * Move uma tarefa para o estado "Em Andamento".
   */
  moveToDoingTask() {
    console.log("passando para frente...");
  }

  /**
   * Método reloadTaskList
   * Recarrega a lista de tarefas do card.
   * @param {string} id - Identificador do card.
   */
  reloadTaskList(id) {
    const isList = document.querySelector(`#${id} ul`);
    if (isList) {
      isList.remove();
    }

    const local = document.querySelector(`#${id}`);
    this.addTask(local);
  }

  /**
   * Método addTask
   * Adiciona uma nova tarefa à lista de tarefas do card.
   * @param {HTMLDivElement} local - Elemento HTML do card.
   */
  async addTask(local) {
    const simpleTask = new SimpleTask();
    const connection = new Connection();
    
    // const result = await connection.post(simpleTask, 'GTPP/Task.php')
    // if (!result.error) {
    // }
    this.#taskList.push(simpleTask);
    
    local.appendChild(this.loadTaskList());
  }

  /**
   * Método loadTaskList
   * Carrega a lista de tarefas no elemento HTML do card.
   * @returns {HTMLDivElement} - Elemento HTML da lista de tarefas.
   */
  loadTaskList() {
    const elementTask = document.getElementById('taskDiv');

    for (let i = 0; i < this.#taskList.length; i++) {
      elementTask.appendChild(this.createTaskElement(this.#taskList[i]));
    }

    return elementTask;
  }

  componentImage(srcImage) {
    const image = document.createElement('img');
    image.src = `../Assets/Image/${srcImage}`;
    return image;
  }

  /**
   * Método configButton
   * Configura os botões de ação do menu do card.
   * @param {HTMLDivElement} local - Elemento HTML do menu.
   * @param {string} id - Identificador do card.
   */
  configButton(local, id) {
    const btnPDF = new Button();
    const btnCSV = new Button();
    const btnADD = new Button();

    const configBtnPDF = buttonPDF;
    configBtnPDF.onAction = () => this.onPDF();
    configBtnPDF.description = this.componentImage('PDF.svg');
    local.appendChild(btnPDF.Button(configBtnPDF));

    const configBtnCSV = buttonCSV;
    configBtnCSV.onAction = () => this.onCSV();
    configBtnCSV.description = this.componentImage('csv.svg');
    local.appendChild(btnCSV.Button(configBtnCSV));

    if (id === 'task_state_1') {
      const configBtnAdd = buttonAdd;
      configBtnAdd.onAction = () => this.reloadTaskList(id);
      configBtnAdd.description = this.componentImage('ADD.svg');
      local.appendChild(btnADD.Button(configBtnAdd));
    }
  }

  /**
   * Método getPriorityText
   * Retorna a descrição da prioridade com base no valor numérico.
   * @param {number} priority - Valor numérico representando a prioridade.
   * @returns {string} - Descrição da prioridade.
   */
  getPriorityText(priority) {
    const titlePriority = ['Prioridade baixa', 'Prioridade media', 'Prioridade Alta'];
    return priority == 0 ? `<img title='${titlePriority[0]}' src="../Assets/Image/eco.svg"/>` : priority == 1 ? `<img title='${titlePriority[1]}' src="../Assets/Image/Warning.svg"/>` : priority == 2 ? `<img title='${titlePriority[2]}' src="../Assets/Image/alert.svg"/>` : 'Não foi especificado o nível';
  }
}