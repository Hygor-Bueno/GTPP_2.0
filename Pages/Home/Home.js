import Card from "../../Components/Card.js";
import Menu from "../../Components/Menu.js";
import Containers from "../../Components/Containers.js";
import { Connection } from "../../Connection/Connection.js";

/**
 * Classe Pagina Home
 * @date 12/01/2024 - 4:48:36 PM
 * @author Hygor Bueno.
 * @export
 * @class Home
 * @classdesc Uma classe destinada para crianção de uma página html
 */
export default class Home {
    async main() {
        try {
            const connection = new Connection();
            const listTaskState = await connection.get('', 'GTPP/TaskState.php');
            console.log(listTaskState);
            if (listTaskState.error) throw new Error(listTaskState.message);

            const menu = new Menu({ idNavMenu: 'navMenu' });

            const elementHome = this.renderCards(listTaskState.data);
            elementHome.insertBefore(menu.nav(), elementHome.firstElementChild), menu.nav();
            return elementHome;

        } catch (error) {

        }
    }

    renderCards(list) {
        const containerHome = new Containers();

        const container = new Containers();
        console.log(list);
        
        const div = document.createElement('div');
        
        
        list.forEach(item => {
            const card = new Card();
            div.appendChild(card.createCard({id:`task_state_${item.id}`,label:item.description}))
        });

        const elementHome = containerHome.containerBasic({
            id: 'containerHome',
            element: container.containerBasic({
                element: div,
            }),
        });

        return elementHome;
    }
}

