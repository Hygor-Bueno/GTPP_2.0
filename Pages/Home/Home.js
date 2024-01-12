import Card from "../../Components/Card.js";
import Menu from "../../Components/Menu.js";
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

