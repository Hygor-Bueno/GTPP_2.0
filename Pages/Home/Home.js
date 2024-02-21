import Card from "../../Components/Card.js";
import Menu from "../../Components/Menu.js";
import Containers from "../../Components/Containers.js";
import { Connection } from "../../Connection/Connection.js";
import Button from "../../Components/Button.js";
import Form from "../../Components/Form.js";
import Paragraph from "../../Components/Paragraph.js";
import { buttonStateTask } from "../../Configuration/Configuration.js";
import { WebSocketGTPP } from "../../Socket.js";

/**
 * Classe Pagina Home
 * @date 12/01/2024 - 4:48:36 PM
 * @author Hygor Bueno.
 * @export
 * @class Home
 * @classdesc Uma classe destinada para crianção de uma página html
 */
export default class Home {
    #web;
    /**
     * Description placeholder
     * @date 2/2/2024 - 1:10:48 PM
     *
     * @async
     * @param {WebSocketGTPP} ws
     * @returns {unknown}
     */
    async main() {
        try {
            // this.#web = ws;
            this.#web = new WebSocketGTPP();
            this.#web.Connect();
            

            const containerHome = new Containers();
            const container = document.createElement('div');

            container.className = "gridRightHome";
            const connection = new Connection();

            // Busca os tipos estados das tarefas.
            const listTaskState = await connection.get('', 'GTPP/TaskState.php');
            //busca as tarefas do colaborador
            const postTask = await connection.get('', 'GTPP/Task.php');

            if (listTaskState.error) throw new Error(listTaskState.message);
            this.stateStoraga(listTaskState.data);

            // Cria o Elemento de Menu.
            const menu = new Menu({ idNavMenu: 'navMenu', class: 'gridLeftHome' });
            container.appendChild(this.settingsHome(JSON.parse(localStorage?.stateTaskGTPP) || []));
            container.appendChild(this.renderCards(JSON.parse(localStorage?.stateTaskGTPP) || [], postTask.data));

            const elementHome = containerHome.containerBasic({ id: 'containerHome', element: container });
            elementHome.insertBefore(menu.nav(), elementHome.firstElementChild);
            return elementHome;
        } catch (error) {
            console.error(error)
        }
    }

    settingsHome(listState) {
        const section = document.createElement('section');
        section.appendChild(this.controllerStateTask(listState));
        section.className = 'gridTopHome';
        return section;
    }

    renderCards(list, getTask) {
        const div = document.createElement('div');
        list.forEach(item => {
            const card = new Card(this.#web);
            div.appendChild(card.createCard({ id: `task_state_${item.id}`, label: item.description, view: item.view }, getTask))
        });
        return div;
    }
    controllerStateTask() {
        try {
            const div = new Containers();
            const button = new Button();
            const p = new Paragraph("Status");
            const containerHeader = document.createElement('div');
            const img = document.createElement('img');
            img.src = '../../Assets/Image/arrowsBottom.svg';
            img.className = 'imageIcon';
            containerHeader.appendChild(p.simpleParagraph());
            buttonStateTask.onAction = () => this.settingsButtonState();
            buttonStateTask.description = img;
            containerHeader.appendChild(button.Button(buttonStateTask));
            const elementDiv = div.containerBasic({ element: containerHeader });
            elementDiv.className = 'labelFormP';
            return elementDiv;
        } catch (error) {
            console.error(error);
        }
    }

    settingsButtonState() {
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