import SimpleTask from "../Class/SimpleTask.js";
import { buttonAdd, buttonCSV, buttonPDF, buttonToTask } from "../Configuration/Configuration.js";
import Button from "./Button.js";

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

     /**
     * Cria um novo card e retorna o elemento DOM correspondente.
     * Esta funcionalidade faz a primeira renderização do componente na DOM.
     *
     * @date 1/11/2024
     * @param {Object} configs - Configurações opcionais para o card.
     * @param {string} configs.id - ID do card.
     * @param {string} configs.label - Rótulo do card.
     * @param {boolean} configs.isAddTasks - Indica se o card é para adicionar tarefas.
     * @returns {HTMLElement} - Elemento DOM representando o card.
     */
    createCard(configs) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        if(configs?.id) cardDiv.id = configs.id;

        const subDivCard = this.createSubDivCard(configs.label);
        const inputCheckbox = this.createButtonHamburger(configs.id, configs.isAddTasks);

        // Adiciona os elementos filhos
        cardDiv.appendChild(subDivCard);
        subDivCard.appendChild(inputCheckbox);

        return cardDiv;
    }

    /**
     * Cria e retorna um novo elemento li representando um item de lista de tarefas.
     *
     * @date 1/11/2024
     * @returns {HTMLLIElement} - Elemento li representando um item de lista.
     */
    loadTaskList() {
        // console.log(this.#taskList)
        const ul = document.createElement('ul');
        ul.className = 'btn-sublist';

        // Aqui vamos fazer com que esse grupo de card venha até nois.
        for(let i = 0; i < this.#taskList.length ; i++) {
            ul.appendChild(this.openCardAddItem(this.#taskList[i]));
        }

        return ul;
    }

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
    createButtonHamburger(id, isListTask) {
        if(isListTask) {
            const fatherNav = document.createElement('nav');
            fatherNav.className = 'fatherNav';

            const inputHamburger = document.createElement('input');
            inputHamburger.id = 'dropdown';
            inputHamburger.className = 'input-box';
            inputHamburger.style="display: none;";
            inputHamburger.type = 'checkbox';
            inputHamburger.checked = false;

            const label = document.createElement('label');
            label.setAttribute("for", "dropdown");
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
        } else {
          return null;
        }
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
        const h1 = document.createElement('h1');
        h1.innerText = "I'm here";
        var mywindow = window.open('', '_blank');
        mywindow.document.write(h1.innerText);
        mywindow.print();  
        mywindow.close();
    }

    /**
     * Manipula a criação de um arquivo CSV.
     *
     * @date 1/12/2024 - 4:41:26 PM
     */
    onCSV() {
        console.log('Criando um arquivo csv....');
    }
    
    /**
     * Abre o card para adicionar um novo item à lista de tarefas.
     *
     * @param {*} item - Item a ser adicionado à lista de tarefas.
     * @returns {HTMLDivElement} - Elemento li representando o item adicionado.
     */
     openCardAddItem(item) {
        let fatherDiv = document.createElement('li');
        fatherDiv.className = 'item';

        let divTextArea = document.createElement('div');
        divTextArea.className = 'div-textarea';

        let divCheckbox = document.createElement('div');
        divCheckbox.className = 'div-checkbox';

        let divTask = document.createElement('div');
        divTask.className = 'div-task';
        divTask.innerText = `${item.description} - ${item.priority} \n Data Inicial: ${item.initial_date} \n Data Final: ${item.final_date}`;

        // Adiciona um ouvinte de eventos de clique à div clicável
        divTask.addEventListener('click', function(event) {
            let divBackground = document.getElementById('modalTask');
            
            if (!divBackground) {
                let hiddenDiv;
                // Cria a div oculta se não existir
                hiddenDiv = document.createElement('div');
                divBackground = document.createElement('div');
                
                divBackground.className = "backgroundHiddenDiv";

                divBackground.id = 'modalTask';
                divBackground.addEventListener('click', event=> {
                    if(event.target.id == 'modalTask') document.getElementById('modalTask').remove();
                })

                
                hiddenDiv.className = 'hiddenDiv';
                hiddenDiv.innerHTML = '<p>Esta é a div oculta.</p>';
                
                divBackground.appendChild(hiddenDiv);
                document.body.appendChild(divBackground);
            } else {
                if (divBackground) {

                }
            }
        });  


        divTextArea.appendChild(divTask);

        fatherDiv.appendChild(divTextArea);
        fatherDiv.appendChild(divCheckbox);

        return fatherDiv;
    }

    moveToDoingTask() {
        console.log("passando para frente...");
    }

    /**
     * Manipula a criação de uma nova tarefa
     * @date 1/12/2024 - 4:41:51 PM
     * @param {HTMLDivElement} local 
     */
    addTask(local) {
        const simpleTask = new SimpleTask();
        this.#taskList.push(simpleTask);
        local.appendChild(this.loadTaskList())
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
        configBtnPDF.onAction = this.onPDF;
        local.appendChild(btnPDF.Button(configBtnPDF));

        const configBtnCSV = buttonCSV;
        configBtnCSV.onAction = this.onCSV;
        local.appendChild(btnCSV.Button(configBtnCSV));

        const configBtnAdd = buttonAdd;
        configBtnAdd.onAction = ()=> this.reloadTaskList(id);
        local.appendChild(btnADD.Button(configBtnAdd));
    }
}
