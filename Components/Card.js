/**
 * Classe que representa um card com funcionalidades relacionadas.
 * @class Card
 * @export
 * @date 1/11/2024 - 11:27:17 AM
 * 
 * @todo fazer a separação de funções que normalmente os modais terão que fazer por exemplo: funcção que ira ter que fazer , passar para o próximo modal que sera para fazendo e depois para analise, parado. bloqueado. feito e cancelado
 */
export default class Card {
    /**
     * Cria um novo card e retorna o elemento DOM correspondente.
     * Esta funcionalidade faz a primeira renderização do componente na DOM.
     * @date 1/11/2024
     * @returns {HTMLElement} - Elemento DOM representando o card.
     */
    createCard() {
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
        subCards.appendChild(this.createNewList());

        console.log(cardDiv);
        return cardDiv;
    }

    /**
     * Cria e retorna um novo elemento li.
     * @date 1/11/2024
     * @returns {HTMLLIElement} - Elemento li representando um item de lista.
     */
    createNewList() {
        const buttonSublist = document.createElement('li');
        buttonSublist.className = 'btn-sublist';
        // buttonSublist.innerText = 'Texto';
        return buttonSublist;
    }

    /**
     * Cria e retorna um novo elemento div para o subcard.
     * @returns {HTMLDivElement} - Elemento div representando o subcard.
     */
    createSubDivCard() {
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
    createButtonHamburger() {
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
    createMenu() {
        const cardMenu = document.createElement('div');
        cardMenu.className = 'menu';
        cardMenu.id = 'menuReturn';

        const btn1 = document.createElement('button');
        btn1.className = 'btn-submenu';
        btn1.innerText = 'Teste';
        btn1.onclick = () => {
            console.log('olá mundo!');
        }

        cardMenu.appendChild(btn1);

        console.log(cardMenu);

        return cardMenu;
    }
}
