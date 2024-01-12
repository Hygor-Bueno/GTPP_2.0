import Card from "../../Components/Card.js";
import Containers from "../../Components/Containers.js";

export default class Home {
    main() {
        const containerHome = new Containers();
        const container = new Containers();
        const card = new Card();

        const elementCard = card.createCard();
        // this.configButton(elementCard);

        // const menu = new Menu();

        return containerHome.containerBasic({
            id: 'containerHome',
            element: container.containerBasic({
                element: elementCard,
            })
        });

        // elementHome.innerHTML+=menu.main();
    }
}

