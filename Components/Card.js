import SimpleTask from "../Class/SimpleTask.js";
import { buttonAdd, buttonCSV, buttonPDF, buttonToTask } from "../Configuration/Configuration.js";
import Util from "../Util.js";
import Button from "./Button.js";
import GeneratorCSV from "./FileGenerator.js";

/**
 * Classe que representa um card para visualização de tarefas pendentes e interação do usuário.
 *
 * @class Card
 * @export
 * @author Jonatas Silva
 * @date 1/11/2024 - 11:27:17 AM
 *
 * @description Esta classe tem a função de representar onde podemos olhar as tarefas pendentes e fazer novas tarefas.
 * Podemos extrair informações de PDF e também de CSV.
 */
export default class Card {
    #taskList=[];
    #postsTasks=[];

    /**
     * Cria um novo card e retorna o elemento DOM correspondente.
     * Esta funcionalidade faz a primeira renderização do componente na DOM.
     *
     * @date 1/11/2024
     * @param {Object} configs - Configurações opcionais para o card.
     * @param {string} configs.id - ID do card.
     * @param {string} configs.label - Rótulo do card.
     * @returns {HTMLElement} - Elemento DOM representando o card.
     */
    createCard(configs, tasks) {
        this.#postsTasks = tasks;

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        if(configs?.id) cardDiv.id = configs.id;
        cardDiv.style.display = configs.view ? 'block' : 'none';

        const subDivCard = this.createSubDivCard(configs.label);
    
        const inputCheckbox = this.createButtonHamburger(configs.id);
    
        cardDiv.appendChild(subDivCard);
        subDivCard.appendChild(inputCheckbox);
    
        const taskDiv = document.createElement('div');
        taskDiv.id = 'taskDiv';
    
        for (let i = 0; i < this.#postsTasks.length; i++) {
            const taskElement = this.createTaskElement(this.#postsTasks[i]);
            configs.id === 'task_state_1' ? taskDiv.appendChild(taskElement) : null;
        }
    
        cardDiv.appendChild(taskDiv);

        return cardDiv;
    }
    
    createTaskElement(taskData) {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.appendChild(this.createTaskElementDescription(taskData));
        taskElement.appendChild(this.createTaskElementPriority(taskData));
        taskElement.appendChild(this.createElementInicialDateAndFinalDate(taskData));

        console.log(this.#taskList);

        for(let i = 0; i < this.#taskList.length ; i++) {
            taskElement.appendChild(this.openCardAddItem(this.#taskList[i]));
        }
        
        this.taskModalClick(taskElement, 'modalTask');
    
        return taskElement;
    }


    createElementInicialDateAndFinalDate(local) {
        const taskElementDate = document.createElement('div');
        taskElementDate.className = 'task-inital';
        taskElementDate.innerText = `Data Inicial: ${local.initial_date} \n Data final: ${local.final_date}`;
        return taskElementDate;
    }

    createTaskElementPriority(local) {
        const taskElementPriority = document.createElement('div');
        taskElementPriority.className = 'task-priority';
        taskElementPriority.innerText = `Prioridade: ${local.priority == 0 ? 'baixa' : local.priority  == 1 ? 'media' : local.priority == 2 ? 'alta' : 'Não foi especificado o nivel'}`;
        return taskElementPriority;
    }

    createTaskElementDescription(local) {
        const tasksElementDescription = document.createElement('div');
        tasksElementDescription.className = 'task-description';
        tasksElementDescription.innerText = `Descrição: ${local.description}`;
        return tasksElementDescription;
    }


    /**
     * Cria e retorna um novo elemento li representando um item de lista de tarefas.
     *
     * @date 1/11/2024
     * @returns {HTMLLIElement} - Elemento li representando um item de lista.
     */
    
    // loadTaskList() {
    //     const ul = document.createElement('div');
    //     ul.id = 'btn-sublist';
    //     return ul;
    // }

    /**
     * Cria e retorna um novo elemento div para o subcard.
     *
     * @param {string} label - Rótulo do subcard.
     * @returns {HTMLDivElement} - Elemento div representando o subcard.
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
     * Cria e retorna um novo elemento input do tipo checkbox (hamburger button).
     * Adiciona um ouvinte de evento para exibir ou ocultar o menu quando o checkbox é clicado.
     *
     * @param {string} id - ID do card.
     * @param {boolean} isListTask - Indica se é um card de lista de tarefas.
     * @returns {HTMLInputElement} - Elemento input representando o botão hamburger.
     */
    createButtonHamburger(id) {
        const fatherNav = document.createElement('nav');
        fatherNav.className = 'fatherNav';
        
        const inputHamburger = document.createElement('input');
        inputHamburger.id = `dropdown_${id}`;
        inputHamburger.className = 'input-box';
        inputHamburger.style="display: none;";
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

        inputHamburger.addEventListener('change', (e) => {
            const cardReturn = document.getElementById(id);
            e.target.checked ? this.openConfigCard(cardReturn,id) : this.closeConfigCard(id);            
        });
        return fatherNav;
    }

    /**
     * Abre o menu de configuração no card especificado.
     *
     * @param {HTMLElement} local - Elemento DOM onde o menu será adicionado.
     * @param {string} id - ID do card.
     */
    openConfigCard(local,id) {
        local.appendChild(this.createMenu(id));
    }
    
    
    /**
     * Fecha o menu de configuração no card especificado.
     *
     * @param {string} id - ID do card.
     */
    closeConfigCard(id) {
        const menuReturn = document.querySelector(`#${id} .fatherMenu`);
        if (menuReturn) {
            menuReturn.remove();
        }
    }

    /**
     * Cria e retorna um novo elemento div representando o menu de configuração.
     *
     * @param {string} id - ID do card.
     * @returns {HTMLDivElement} - Elemento div representando o menu.
     */
    createMenu(id) {
        const fatherMenu = document.createElement("div");
        fatherMenu.className = "fatherMenu";

        const cardMenu = document.createElement('div');
        cardMenu.className = 'menu';

        fatherMenu.appendChild(cardMenu);
        this.configButton(cardMenu,id);

        return fatherMenu;
    }

    /**
     * Manipula a criação de um arquivo PDF.
     *
     * @date 1/12/2024 - 4:40:33 PM
     */
    onPDF() {
        const util = new Util();
        util.onPDF();
    }

    /**
    * Manipula a criação de um arquivo CSV.
    *
    * @date 1/12/2024 - 4:41:26 PM
    */

    onCSV() {
        const taskInfoElements = document.querySelectorAll('.task-info');
        const taskData = {};
     
        taskInfoElements.forEach((element) => {
           const fieldName = element.getAttribute('data-field');
           const fieldValue = element.innerText.split(':')[1].trim();
           taskData[fieldName] = fieldValue;
        });
     
        // Agora você tem um objeto taskData com as informações extraídas do modal.
        console.log(taskData);
     
        // Aqui você pode usar as informações para gerar o CSV ou fazer o que for necessário.
        const wordMatrix = Object.values(taskData).map((value) => [value]);
        const generateCSV = new GeneratorCSV();
        generateCSV.generateCSV(wordMatrix);
     }
    
    /**
     * Abre o card para adicionar um novo item à lista de tarefas.
     *
     * @param {*} item - Item a ser adicionado à lista de tarefas.
     * @returns {HTMLDivElement} - Elemento li representando o item adicionado.
     */
    openCardAddItem(item) {
        console.log(item);

        const listItem = document.createElement('li');
        listItem.className = 'item';
    
        const divTextArea = document.createElement('div');
        divTextArea.className = 'div-textarea';
    
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-info';
    
        // taskDiv.innerText = `
        //     Description: ${item.description}
        //     Prioridade: ${item.priority}
        //     DataInicial: ${item.initial_date}
        //     DataFinal: ${item.final_date}
        // `;
        
        this.taskModalClick(taskDiv, 'modalTask');    
    
        divTextArea.appendChild(taskDiv);
    
        listItem.appendChild(divTextArea);
    
        return listItem;
    }
    

    moveToDoingTask() {
        console.log("passando para frente...");
    }

    addTask(local) {
        const simpleTask = new SimpleTask();
        this.#taskList.push(simpleTask);
        local.appendChild(this.createTaskElement());
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

    /**
     * Recarrega a lista de tarefas no card especificado.
     *
     * @param {string} id - ID do card.
     */
    reloadTaskList(id){
        const isList = document.querySelector(`#${id} ul`);
        if(isList){
            isList.remove();
        }

        const local = document.querySelector(`#${id}`);
        this.addTask(local);
    }

    /**
     * Configuração dos botões no menu de configuração.
     *
     * @param {HTMLDivElement} local - Elemento DOM onde os botões serão adicionados.
     * @param {string} id - ID do card.
     */
    configButton(local,id) {
        const btnPDF = new Button();
        const btnCSV = new Button();
        const btnADD = new Button();

        const configBtnPDF = buttonPDF;
        configBtnPDF.onAction = () => this.onPDF(id);
        local.appendChild(btnPDF.Button(configBtnPDF));

        const configBtnCSV = buttonCSV;
        configBtnCSV.onAction = () => this.onCSV(id);
        local.appendChild(btnCSV.Button(configBtnCSV));

        if(id === 'task_state_1') {    
            const configBtnAdd = buttonAdd;
            configBtnAdd.onAction = () => this.reloadTaskList(id);
            local.appendChild(btnADD.Button(configBtnAdd));
        }
    }
}
