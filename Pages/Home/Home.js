import Button from "../../Components/Button.js";
import Card from "../../Components/Card.js";
import Containers from "../../Components/Containers.js";
import Menu from "../../Components/Menu.js";

export default class Home {
    main() {
        const containerHome = new Containers();
        const container = new Containers();
        const card = new Card();

        const elementCard = card.createCard();
        this.configButton(elementCard);

        // const menu = new Menu();

        return containerHome.containerBasic({
            id: 'containerHome',
            element: container.containerBasic({
                element: elementCard
            })
        });

        // elementHome.innerHTML+=menu.main();
    }

    onPDF() {
        console.log('Criando um arquivo pdf....');
    }
    onCSV() {
        console.log('Criando um arquivo csv....');
    }
    addItem() {
        console.log('Criando um novo item....');
    }

    configButton(local) {
        const btnPDF = new Button();
        const btnCSV = new Button();
        const btnADD = new Button();
        local.appendChild(btnPDF.Button({
            'type': 'button',
            'title': 'Criar um arquivo PDF',
            'description': 'PDF',
            'onAction': this.onPDF,
            'classButton': 'bgButton'
        }))
        local.appendChild(btnCSV.Button({
            'type': 'button',
            'title': 'Criar um arquivo CSV',
            'description': 'CSV',
            'onAction': this.onCSV,
            'classButton': 'bgButton'
        }))
        local.appendChild(btnADD.Button({
            'type': 'button',
            'title': 'Adicione uma nova tarefa',
            'description': 'ADD',
            'onAction': this.addItem,
            'classButton': 'bgButton'
        }))
    }
}

