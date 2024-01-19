import Card from "../../Components/Card.js";
import Menu from "../../Components/Menu.js";
import Containers from "../../Components/Containers.js";
import { Connection } from "../../Connection/Connection.js";
import Title from "../../Components/Title.js";
import Button from "../../Components/Button.js";

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
            const containerHome = new Containers();
            const container = new Containers();
            const connection = new Connection();

            // Busca os estados das tarefas.
            const listTaskState = await connection.get('', 'GTPP/TaskState.php');
            if (listTaskState.error) throw new Error(listTaskState.message);

            // Cria o Elemento de Menu.
            const menu = new Menu({ idNavMenu: 'navMenu', class: 'gridLeftHome' });

            const elementHome = containerHome.containerBasic({
                id: 'containerHome',
                element: container.containerBasic({
                    element: this.renderCards(listTaskState.data),
                    class: 'gridRightHome'
                }),
            });

            elementHome.insertBefore(menu.nav(), elementHome.firstElementChild);
            elementHome.insertBefore(this.settingsHome(listTaskState.data), elementHome.firstElementChild);

            return elementHome;

        } catch (error) {

        }
    }
    settingsHome(listState) {
        const div = document.createElement('div');
        div.appendChild(this.controllerStateTask(listState));
        div.className = 'gridLeftTop';
        return div;
    }

    renderCards(list) {
        const div = document.createElement('div');
        list.forEach(item => {
            const card = new Card();
            div.appendChild(card.createCard({ id: `task_state_${item.id}`, label: item.description }))
        });
        return div;
    }
    controllerStateTask(listState) {
        try {

            const div = new Containers();
            const containerHeader = document.createElement('div');
            const button = new Button();


            const h1 = document.createElement('p');
            h1.innerText = "Status ";

            const img = document.createElement('img');
            img.src = '../../Assets/Image/arrowsBottom.svg';
            img.className = 'imageIcon';

            containerHeader.appendChild(h1);

            containerHeader.appendChild(button.Button({
                title: 'Abrir lista de status', type: 'button', description: img, onAction: (e) => {
                    const img = document.querySelector('#buttoStateTask img');
                    
                    const local = document.querySelector('.labelFormP');
                    const divList = document.querySelector('.labelFormP section');
                    if(divList){
                        img.classList.remove('arrowsClose')
                        divList.remove() 
                    }else{
                        img.classList.add('arrowsClose')
                        local.appendChild(this.optionStateTask(listState));
                    } 
                        
                },
                classButton: 'btn',
                id: 'buttoStateTask'
            }));

            const elementDiv = div.containerBasic({ element: containerHeader });

            elementDiv.className = 'labelFormP';

            return elementDiv;
        } catch (error) {
            console.error(error);
        }
    }
    optionStateTask(listState) {
        const containerBody = document.createElement('section');
        return containerBody;
    }
}