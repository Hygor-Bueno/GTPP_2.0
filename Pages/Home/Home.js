import Card from "../../Components/Card.js";
import Menu from "../../Components/Menu.js";
import Containers from "../../Components/Containers.js";
import { Connection } from "../../Connection/Connection.js";
import Title from "../../Components/Title.js";
import Button from "../../Components/Button.js";
import Form from "../../Components/Form.js";
import Paragraph from "../../Components/Paragraph.js";

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
            this.stateStoraga(listTaskState.data);

            // Cria o Elemento de Menu.
            const menu = new Menu({ idNavMenu: 'navMenu', class: 'gridLeftHome' });

            const elementHome = containerHome.containerBasic({
                id: 'containerHome',
                element: container.containerBasic({
                    element: this.renderCards(JSON.parse(localStorage?.stateTaskGTPP) || []),
                    class: 'gridRightHome'
                }),
            });

            elementHome.insertBefore(menu.nav(), elementHome.firstElementChild);
            elementHome.insertBefore(this.settingsHome(JSON.parse(localStorage?.stateTaskGTPP) || []), elementHome.firstElementChild);


            return elementHome;

        } catch (error) {
            console.error(error)
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
            div.appendChild(card.createCard({ id: `task_state_${item.id}`, label: item.description,view:item.view }))
        });
        return div;
    }
    controllerStateTask() {
        try {
            const div = new Containers();
            const containerHeader = document.createElement('div');
            const button = new Button();

            const p = new Paragraph("Status");

            const img = document.createElement('img');
            img.src = '../../Assets/Image/arrowsBottom.svg';
            img.className = 'imageIcon';

            containerHeader.appendChild(p.simpleParagraph());

            containerHeader.appendChild(button.Button({
                title: 'Abrir lista de status', type: 'button', description: img, onAction: () => {
                    const img = document.querySelector('#buttoStateTask img');
                    const local = document.querySelector('.labelFormP');
                    const divList = document.querySelector('.labelFormP section');
                    if (divList) {
                        img.classList.remove('arrowsClose')
                        divList.remove()
                    } else {
                        img.classList.add('arrowsClose')
                        local.appendChild(this.optionStateTask());
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
    optionStateTask() {
        let data = localStorage.stateTaskGTPP || '[]';
        let listStorage = JSON.parse(data);

        const containerBody = document.createElement('section');
        listStorage.forEach(item => {
            const div = document.createElement('div');
            div.className = 'itemsFormRow';
            const stateInput = new Form();
            const elementeState = stateInput.input({ inputId: `check_state_view_${item.id}`, inputType: 'checkbox', onAction: (e) => { this.reloadStorage(item.id, e.target.checked) } });
            elementeState.checked = item.view;
            const labelState = stateInput.simpleLabel({ description: item.description, for: `check_state_view_${item.id}`, classLabel: 'labelForm' })
            div.appendChild(elementeState);
            div.appendChild(labelState);
            containerBody.appendChild(div);
        });
        return containerBody;
    }

    stateStoraga(list) {
        if (!localStorage.stateTaskGTPP) {
            let result = [];
            list.forEach(item => {
                let jsonState = {};
                jsonState.id = item.id;
                jsonState.description = item.description;
                jsonState.view = true;
                result.push(jsonState);
            });
            localStorage.setItem('stateTaskGTPP', JSON.stringify(result));
        }
    }
    reloadStorage(id, view) {
        let listStorage = JSON.parse(localStorage.stateTaskGTPP);
        listStorage.forEach(item => { if (item.id == id) item.view = view });
        localStorage.setItem('stateTaskGTPP', JSON.stringify(listStorage));
        this.reloadSate();
    }
    reloadSate() {
        let data = localStorage.stateTaskGTPP || '[]';
        let listStorage = JSON.parse(data);
        if (listStorage.length) {
            listStorage.forEach(item => {
                const task = document.getElementById(`task_state_${item.id}`);
                if (item.view) {
                    task.style.display = 'block'
                } else {
                    task.style.display = 'none'
                }
            })
        }
    }

}