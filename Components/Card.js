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
    createCard = (numSubCards) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.id = 'cardReturn';

        // Cria os elementos de título e parágrafo
        const subCards = document.createElement('ul');
        const subDivCard = this.createSubDivCard();
        const inputCheckbox = this.createButtonHamburger();

        subCards.className = 'subCard';

        // Adiciona os elementos filhos
        cardDiv.appendChild(subDivCard);
        subDivCard.appendChild(inputCheckbox);
        cardDiv.appendChild(subCards);

        for(let i=0; i < numSubCards; i++) {
            subCards.appendChild(this.createNewList());
        }

        return cardDiv;
    }

    /**
     * Cria e retorna um novo elemento li.
     * @date 1/11/2024
     * @returns {HTMLLIElement} - Elemento li representando um item de lista.
     */
    createNewList = () => {
        const buttonSublist = document.createElement('li');
        buttonSublist.className = 'btn-sublist';
        
        buttonSublist.appendChild(this.openCardAddItem());
        return buttonSublist;
    }

    /**
     * Cria e retorna um novo elemento div para o subcard.
     * @returns {HTMLDivElement} - Elemento div representando o subcard.
     */
    createSubDivCard = () => {
        const subCardDiv = document.createElement('div');
        subCardDiv.className = 'subdivcard';

        const title = document.createElement('h4');
        title.innerText = 'Title';

        subCardDiv.appendChild(title);

        return subCardDiv;
    }

    /**
     * Cria e retorna um novo elemento input do tipo checkbox (hamburger button).
     * Adiciona um ouvinte de evento para exibir ou ocultar o menu quando o checkbox é clicado.
     * @returns {HTMLInputElement} - Elemento input representando o botão hamburger.
     */
    createButtonHamburger = () => {
        const inputHamburger = document.createElement('input');
        inputHamburger.type = 'checkbox';
        inputHamburger.checked = false;

        inputHamburger.addEventListener('change', (e) => {
            const cardReturn = document.getElementById('cardReturn');
            if (e.target.checked) {
                cardReturn.appendChild(this.createMenu());
            } else {
                const menuReturn = document.getElementById('menuReturn');
                if (menuReturn) {
                    menuReturn.remove();
                }
            }
        });

        return inputHamburger;
    }

    /**
     * Cria e retorna um novo elemento div representando o menu.
     * @returns {HTMLDivElement} Elemento div representando o menu.
     */
    createMenu = () => {
        const cardMenu = document.createElement('div');
        cardMenu.className = 'menu';
        cardMenu.id = 'menuReturn';
        this.configButton(cardMenu);
        console.log(cardMenu);
        return cardMenu;
    }

    /**
     * Manipula a criação de um arquivo PDF
     * @date 1/12/2024 - 4:40:33 PM
     */
    onPDF = () => {
        window.print();
    }

    /**
     * Manipula uma criação de um arquivo CSV
     * @date 1/12/2024 - 4:41:26 PM
     */
    onCSV = () => {
        console.log('Criando um arquivo csv....');
    }


    /**
     * Manipula a criação de uma nova tarefa
     * @date 1/12/2024 - 4:41:51 PM
     */
    openCardAddItem = () => {
        // div pai
        let fatherDiv = document.createElement('div');
        fatherDiv.className = 'father-div';

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
     * Configuração dos botões
     * @date 1/12/2024 - 4:42:44 PM 
     * @param {HTMLDivElement} local - O elemento onde os botões serão adicionados.
     */
    configButton = (local) => {
        const btnPDF = new Button();
        const btnCSV = new Button();
        const btnADD = new Button();
    
        const configBtnPDF = buttonPDF;
        configBtnPDF.onAction = this.onPDF.bind(this);
        local.appendChild(btnPDF.Button(configBtnPDF));

        const configBtnCSV = buttonCSV;
        configBtnCSV.onAction = this.onCSV.bind(this);
        local.appendChild(btnCSV.Button(configBtnCSV));

        const configBtnAdd = buttonAdd;
        configBtnAdd.onAction = this.openCardAddItem.bind(this);
        local.appendChild(btnADD.Button(configBtnAdd));
    }
}
