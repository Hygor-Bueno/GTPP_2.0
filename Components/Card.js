import { buttonAdd, buttonCSV, buttonPDF } from "../Configuration/Configuration.js";
import Button from "./Button.js";

/**
 * @class Card
 * @export
 * @author Jonatas Silva.
 * @date 1/11/2024 - 11:27:17 AM
 * 
 * @description essa classe tem a função de representar aonde vamos poder olhar as tarefas pendentes e fazer novas tarefas, podemos extrair informações, de PDF e também de CSV
 */
export default class Card {
    /**
     * Cria um novo card e retorna o elemento DOM correspondente.
     * Esta funcionalidade faz a primeira renderização do componente na DOM.
     * @date 1/11/2024
     * @returns {HTMLElement} - Elemento DOM representando o card.
     */
    createCard(configs) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        if(configs?.id) cardDiv.id = configs.id;

        const subDivCard = this.createSubDivCard(configs.label);
        const inputCheckbox = this.createButtonHamburger(configs.id);

        // Adiciona os elementos filhos
        cardDiv.appendChild(subDivCard);
        subDivCard.appendChild(inputCheckbox);

        // chamando um grupo de lista
        cardDiv.appendChild(this.loadTaskList([]))

        console.log(cardDiv)
        return cardDiv;
    }

    /**
     * Cria e retorna um novo elemento li.
     * @date 1/11/2024
     * @returns {HTMLLIElement} - Elemento li representando um item de lista.
     */
    loadTaskList(tasks) {
        console.log(tasks)
        const ul = document.createElement('ul');
        ul.className = 'btn-sublist';

        // Aqui vamos fazer com que esse grupo de tarefas venha se relevante para nós
        for(let i = 0; i < tasks.length ; i++) {
            ul.appendChild(this.openCardAddItem());
        }

        return ul;
    }

    /**
     * Cria e retorna um novo elemento div para o subcard.
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
     * @returns {HTMLInputElement} - Elemento input representando o botão hamburger.
     */
    createButtonHamburger(id) {
        const inputHamburger = document.createElement('input');
        inputHamburger.type = 'checkbox';
        inputHamburger.checked = false;

        inputHamburger.addEventListener('change', (e) => {
            const cardReturn = document.getElementById(id);
            e.target.checked ? this.openConfigCard(cardReturn,id) : this.closeConfigCard(id);            
        });

        return inputHamburger;
    }

    openConfigCard(local,id) {
        local.appendChild(this.createMenu(id));
    }
    
    closeConfigCard(id) {
        const menuReturn = document.querySelector(`#${id} .menu`);
        if (menuReturn) {
            menuReturn.remove();
        }
    }

    /**
     * Cria e retorna um novo elemento div representando o menu.
     * @returns {HTMLDivElement} Elemento div representando o menu.
     */
    createMenu(id) {
        const cardMenu = document.createElement('div');
        cardMenu.className = 'menu';
        this.configButton(cardMenu,id);
        console.log(cardMenu);
        return cardMenu;
    }

    /**
     * Manipula a criação de um arquivo PDF
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
     * Manipula uma criação de um arquivo CSV
     * @date 1/12/2024 - 4:41:26 PM
     */
    onCSV() {
        console.log('Criando um arquivo csv....');
    }
    
    /**
     * Description placeholder
     * @date 1/16/2024 - 10:25:18 AM
     *
     * @returns {*}
     */
     openCardAddItem() {
        // div pai
        let fatherDiv = document.createElement('li');
        fatherDiv.className = 'item';

        //divisoria para area de texto
        let divTextArea = document.createElement('div');
        divTextArea.className = 'div-textarea';

        // divisoria para inputcheck
        let divCheckbox = document.createElement('div');
        divCheckbox.className = 'div-checkbox';

        // divisoria de tarefas
        let divTask = document.createElement('div');
        divTask.className = 'div-task';
        divTask.innerText = 'task'

        // button button-check
        let button = document.createElement('button');
        button.className = 'btn-check';
        button.innerText = 'Fazendo';


        // envolvedo textarea no divisor
        divTextArea.appendChild(divTask);

        // envolvedo input checkbox no divisor
        divCheckbox.appendChild(button);

        fatherDiv.appendChild(divTextArea);
        fatherDiv.appendChild(divCheckbox);

        return fatherDiv;
    }

    /**
     * Manipula a criação de uma nova tarefa
     * @date 1/12/2024 - 4:41:51 PM
     */
    addTask(local) {
        const tasks = ['a'];
        local.appendChild(this.loadTaskList(tasks))
    }

    reloadTaskList(id){
        const isList = document.querySelector(`${id} ul`);
        if(isList){
            isList.remove();
        }
        const local = document.getElementById(`${id}`);
        
        this.addTask(local);
    }

    /**
     * Configuração dos botões
     * @date 1/12/2024 - 4:42:44 PM 
     * @param {HTMLDivElement} local - O elemento onde os botões serão adicionados.
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
