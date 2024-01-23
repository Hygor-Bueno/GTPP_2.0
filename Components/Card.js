import SimpleTask from "../Class/SimpleTask.js";
import { buttonAdd, buttonCSV, buttonPDF, buttonToTask } from "../Configuration/Configuration.js";
import Util from "../Util.js";
import Button from "./Button.js";
import GeneratorCSV from "./FileGenerator.js";

export default class Card {
  #taskList = [];
  #getTasks = [];

  createCard(configs, tasks) {
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
      if(configs.id === `task_state_${this.#getTasks[i].state_id}`) {
        taskDiv.appendChild(taskElement);
      }
    }

    cardDiv.appendChild(taskDiv);
    return cardDiv;
  }

  createTaskElement(taskData) {
    const taskElement = document.createElement('div');
    taskElement.setAttribute('draggable', 'true');
    taskElement.className = 'task';

    taskElement.appendChild(this.createTaskElementDescription(taskData));
    taskElement.appendChild(this.createTaskElementPriority(taskData));
    taskElement.appendChild(this.createElementInicialDateAndFinalDate(taskData));

    this.taskModalClick(taskElement, 'modalTask');
    return taskElement;
  }

  addTask(local) {
    const simpleTask = new SimpleTask();
    this.#taskList.push(simpleTask);
    local.appendChild(this.loadTaskList());
  }

  createElementInicialDateAndFinalDate(local) {
    const taskElementDate = document.createElement('div');
    taskElementDate.className = 'task-date';
    taskElementDate.innerHTML = `${local.initial_date} | ${local.final_date}`;
    return taskElementDate;
  }

  createTaskElementPriority(local) {
    const taskElementPriority = document.createElement('div');
    taskElementPriority.className = 'task-priority';
    taskElementPriority.innerHTML = `${this.getPriorityText(local.priority)}`;
    return taskElementPriority;
  }

  createTaskElementDescription(local) {
    const tasksElementDescription = document.createElement('div');
    tasksElementDescription.className = 'task-description';
    tasksElementDescription.innerHTML = `<b>${local.description}</b>`;
    return tasksElementDescription;
  }

  loadTaskList() {
    const elementTask = document.getElementById('taskDiv');

    for (let i = 0; i < this.#taskList.length; i++) {
       elementTask.appendChild(this.createTaskElement(this.#taskList[i]));
    }

    return ul;
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
    const fatherMenu = document.createElement("div");
    fatherMenu.className = "fatherMenu";
    const cardMenu = document.createElement('div');
    cardMenu.className = 'menu';
    fatherMenu.appendChild(cardMenu);
    this.configButton(cardMenu, id);
    return fatherMenu;
  }

  onPDF() {
    const util = new Util();
    util.onPDF(`hello world`);
  }

  onCSV() {
    const taskInfoElements = document.querySelectorAll('.task-info');
    const taskData = {};

    taskInfoElements.forEach((element) => {
      const fieldName = element.getAttribute('data-field');
      const fieldValue = element.innerText.split(':')[1].trim();
      taskData[fieldName] = fieldValue;
    });

    console.log(taskData);

    const wordMatrix = Object.values(taskData).map((value) => [value]);
    const generateCSV = new GeneratorCSV();
    generateCSV.generateCSV(wordMatrix);
  }

  moveToDoingTask() {
    console.log("passando para frente...");
  }

  taskModalClick(local, ElementId) {
    local.addEventListener('click', function () {
      const modalTask = document.getElementById(`${ElementId}`);
      if (!modalTask) {
        const modalBackground = document.createElement('div');
        modalBackground.className = 'backgroundHiddenDiv';
        modalBackground.id = 'modalTask';
        const modalContent = document.createElement('div');
        modalContent.className = 'hiddenDiv';
        modalContent.innerHTML = '<p>Esta é a div oculta.</p>';
        modalBackground.appendChild(modalContent);
        document.body.appendChild(modalBackground);

        modalBackground.addEventListener('click', function (event) {
          if (event.target.id === 'modalTask') {
            modalBackground.remove();
          }
        });
      }
    });
  }

  reloadTaskList(id) {
    const isList = document.querySelector(`#${id} ul`);
    if (isList) {
      isList.remove();
    }

    const local = document.querySelector(`#${id}`);
    this.addTask(local);
  }

  configButton(local, id) {
    const btnPDF = new Button();
    const btnCSV = new Button();
    const btnADD = new Button();

    const configBtnPDF = buttonPDF;
    configBtnPDF.onAction = () => this.onPDF();
    local.appendChild(btnPDF.Button(configBtnPDF));

    const configBtnCSV = buttonCSV;
    configBtnCSV.onAction = () => this.onCSV();
    local.appendChild(btnCSV.Button(configBtnCSV));

    if (id === 'task_state_1') {
      const configBtnAdd = buttonAdd;
      configBtnAdd.onAction = () => this.reloadTaskList(id);
      local.appendChild(btnADD.Button(configBtnAdd));
    }
  }
  
  getPriorityText(priority) {
    return priority == 0 ? 'baixa' : priority == 1 ? 'média' : priority == 2 ? 'alta' : 'Não foi especificado o nível';
  }
2}
