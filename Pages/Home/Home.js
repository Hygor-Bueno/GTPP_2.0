import Card from "../../Components/Card.js";
import Containers from "../../Components/Containers.js";

/**
 * Classe Pagina Home
 * @date 12/01/2024 - 4:48:36 PM
 * @author Hygor Bueno.
 * @export
 * @class Home
 * @classdesc Uma classe destinada para crianção de uma página html
 */
export default class Home {
    main() {
        const containerHome = new Containers();
        const container = new Containers();

        const card = new Card();
        const menu = new Menu({idNavMenu:'navMenu'});

<<<<<<< HEAD
        const elementHome = containerHome.containerBasic({
            id: 'containerHome',
            element: container.containerBasic({
                element: card.createCard()
            })
        });
        elementHome.insertBefore(menu.nav(), elementHome.firstElementChild), menu.nav();
        return elementHome;
=======
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
>>>>>>> 0ca27cd8f3aaf1209c5c3fc14aee1ab973022ac0
    }
}

