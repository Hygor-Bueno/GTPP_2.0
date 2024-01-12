import Card from "../../Components/Card.js";
import Containers from "../../Components/Containers.js";
import Menu from "../../Components/Menu.js";

export default class Home {
    main() {
        const containerHome = new Containers();
        const container = new Containers();

        const card = new Card();
        const menu = new Menu();

        const elementHome = containerHome.containerBasic({
            id: 'containerHome',
            element: container.containerBasic({
                element: card.createCard()
            })
        });
        elementHome.insertBefore(menu.nav(), elementHome.firstElementChild), menu.nav();
        return elementHome;
    }
}

