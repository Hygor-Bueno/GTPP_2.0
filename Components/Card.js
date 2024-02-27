import Tasks from "../Class/Tasks.js";
import Button from "./Button.js";
import Modal from "./Modal.js";
import SVG from "./SVG.js";
import { SVGImageArchived} from "../Configuration/ImagesSVG.js";
import SuspendedTask from "../Class/SuspendedTask.js";
import CardTools from "../Class/Cardtools.js";
import SimpleTask from "../Class/SimpleTask.js";

/**
 * Classe que representa um cartão de tarefa.
 */
export default class Card extends CardTools {
  /**
   * @description Lista das informações necessarias para carregar um card novo.
   * @type {[{id:number;description:string;percent:number;state_description:string;state_id:number;priority:string;users:number;expire:string;csds:[];user_id:number;initial_date:string;final_date:string;}]}
   */
  taskList = [];
  
  /**
   * Pegando todos os simples cards para aparecerem na tela.
   * @type {[{id:number;description:string;percent:number;state_description:string;state_id:number;priority:string;users:number;expire:string;csds:[];user_id:number;initial_date:string;final_date:string;}]}
   */
  getTasks = [];
  colorBD = [];
  getConfigId;
  #ws;
   /**
   * Cria uma nova instância de Card.
   * @param {Object} ws - Objeto WebSocket.
   */
  constructor(ws) {
    super();
    this.#ws = ws;
  }

  /**
   * Cria um cartão de tarefa.
   * @param {{id:number;view:boolean;label:string;}} configs Configurações do cartão.
   * @param {string[]} tasks Lista de tarefas do cartão.
   * @param {string[]} listTaskState Lista de estados da tarefa.
   */
  async createCard(configs, tasks, listTaskState) {
    try {
      this.colorBD = listTaskState;
      this.getConfigId = `task_state_${configs.id}`;
      this.getTasks = tasks;
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card';
      cardDiv.style.display = configs.view ? 'block' : 'none';
      if (configs?.id) cardDiv.id = `task_state_${configs.id}`;
      const inputCheckbox = this.createButtonHamburger(configs.id);
      cardDiv.appendChild(this.getSubDivCard(configs, inputCheckbox));
      const taskDiv = document.createElement('div');
      taskDiv.id = 'taskDiv';
      taskDiv.className='column'
      await this.showTask(configs, taskDiv);
      cardDiv.appendChild(taskDiv);
      return cardDiv;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * @description Aqui vamos exibir nossas tarefas
   * @param {{id:number;}} config 
   * @param {Object} local 
   */
  async showTask(config, local) {
    for (let i = 0; i < this.getTasks.length; i++) {
      const taskElement = await this.createTaskElement(this.getTasks[i]);
      if (config.id === this.getTasks[i].state_id) local.appendChild(taskElement);
    }
  }

  /**
   * Cria um sub-div do cartão.
   * @param {{label:string;}} configs Configurações do cartão.
   * @param {string} inputCheckbox Checkbox do cartão.
   */
  getSubDivCard(configs, inputCheckbox) {
    try {
      const subDivCard = this.createSubDivCard(configs.label);
      subDivCard.appendChild(inputCheckbox);
      return subDivCard;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Cria um elemento de descrição e prioridade da tarefa.
   * @param {{id:number;}} config - Dados da tarefa.
   * @returns {HTMLElement} - Elemento HTML da descrição e prioridade.
   */
  async createTaskElement(config) {
    try {
      const taskElement = document.createElement('div');
      const subBoxTaskElement = document.createElement('div');
      taskElement.className = 'task';
      subBoxTaskElement.className = 'subTask';
      taskElement.dataset.taskid = config.id;
      taskElement.append(this.createElementDetails(config), subBoxTaskElement);
      subBoxTaskElement.append(this.createdPercentTask(config), this.createTaskElementPriority(config), await this.createdUserElement(config));
      return taskElement;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Cria um elemento de descrição e prioridade da tarefa.
   * @param {{description:string;initial_date:string;final_date:string;}} taskData
   * @return {HTMLDivElement}
   */
  createElementDetails(taskData) {
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
   * @param {{final_date:string;initial_date:string}} config - Dados da data da tarefa.
   */
  createElementDate(config) {
    try {
      const taskElementInitialDate = document.createElement('div');
      taskElementInitialDate.className = 'dateTasks'
      config && taskElementInitialDate.append(this.getDateInit(config.initial_date), this.getDateFinal(config.final_date));
      return taskElementInitialDate;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Cria um elemento de data inicial da tarefa.
   * @param {string} initialDate - Data inicial da tarefa.
   */
  getDateInit(initialDate) {
    try {
      const divDt = document.createElement('div');
      const label = document.createElement('label');
      label.innerText = 'Data inicial';
      const span = document.createElement('span');
      span.innerText = `${initialDate.split('-').reverse().join('/')}`;
      divDt.append(label, span);
      return divDt;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Cria um elemento de data final da tarefa.
   * @param {string} finalDate - Data final da tarefa.
   */
  getDateFinal(finalDate) {
    try {
      const div = document.createElement('div');
      const label = document.createElement('label');
      label.innerText = 'Data final';
      const span = document.createElement('span');
      span.innerText = `${finalDate.split('-').reverse().join('/')}`;
      div.append(label, span);
      return div;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * cria a data inicial e final.
   * @param {{final_date:string;initial_date:string}} config - ele vai retornar uma lista
   */
  createElementInicialDateAndFinalDate(config) {
    try {
      const taskElementDate = document.createElement('div');
      taskElementDate.appendChild(this.createElementDate(config));
      taskElementDate.className = 'task-date';
      return taskElementDate;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Cria um elemento de prioridade da tarefa.
   * @param {{priority:number}} config - Dados da prioridade da tarefa.
   * @returns {HTMLElement} Elemento HTML da prioridade da tarefa.
   */
  createTaskElementPriority(config) {
    try {
      const taskElementPriority = document.createElement('div');
      taskElementPriority.className = 'task-priority';
      taskElementPriority.appendChild(this.getPriorityTextOrImage(config.priority || 0));
      return taskElementPriority;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Cria um elemento de colaborador da tarefa.
   * @async
   * @param {{users:number;}} numberCollaboration - Dados do colaborador da tarefa.
   */
  async createdUserElement(numberCollaboration) {
    try {
      const taskElementPriority = document.createElement('div');
      taskElementPriority.className = 'task-priority';
      taskElementPriority.appendChild(await this.getUserImage(numberCollaboration.users));
      return taskElementPriority;
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Cria um elemento de descrição da tarefa.
   * @param {{description:string;initial_date:string;final_date:string;}} taskData
   */
  createTaskElementDescription(taskData) {
    try {
      const tasksElementDescription = document.createElement('div');
      const htmlBold = document.createElement('b');
      tasksElementDescription.className = 'task-description';
      tasksElementDescription.title = taskData.description;
      htmlBold.innerText = taskData.description || '';
      tasksElementDescription.appendChild(htmlBold);
      this.visualComponentsButton(taskData, tasksElementDescription);   
      return tasksElementDescription;
    } catch (error) {
      console.error(error.message);
    }
  }
  
  /**
   * Visualiza componentes de botão.
   * nessa função tem um controle em quais componentes vão ter um botão os primeiros é o que vao ter o componente para ser controlados.
   * @param {{state_id:number;}} config - Configurações do botão.
   * @param {HTMLElement} localElement - Elemento HTML local onde o botão será inserido.
   */
  visualComponentsButton(config, localElement) {
    try {
      const svg = new SVG();
      const loadSuspendedTasks = new SuspendedTask(this.colorBD, this.#ws);
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
   * Recarrega a lista de tarefas do cartão.
   * @param {string} id - ID do cartão.
   */
  reloadTaskList (id) {
    try {
      const isList = document.querySelector(`#task_state_${id} ul`);
      if (isList) {
        isList.remove();
      }
      const local = document.querySelector(`#task_state_${id}`);
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
}

