import Button from "../Components/Button.js";
import Form from "../Components/Form.js";
import Modal from "../Components/Modal.js";
import TextArea from "../Components/TextArea.js";
import { saveButton } from "../Configuration/Configuration.js";
import { suspendedInput } from "../Configuration/Configuration.js";
import { Connection } from "../Connection/Connection.js";

/** Classe que representa uma tarefa suspensa.
 *  @example const suspendedTask = new SuspendedTask(colorsBD);
 */
export default class SuspendedTask {
    days = null;
    reason;
    task_id;
    bdColor;

    /**
     * Cria uma nova instância de SuspendedTask.
     * @param {Array} colorsBD - Cores do banco de dados.
     */
    constructor(colorsBD) {
        this.bdColor = colorsBD;
    }
    
    /**
     * Cria um modal para tarefa suspensa.
     * @param {Object} config - Configurações para o modal.
     * @param {number} config.state_id - ID do estado da tarefa.
     * @param {string} config.description - Descrição da tarefa.
     * @param {string} config.state_description - Descrição do estado da tarefa.
     * @returns {HTMLElement} - Elemento HTML do modal.
     */
    suspended(config) {
        try {
            const modal = document.createElement('div');
            const divTitle = document.createElement('div');

            modal.setAttribute('modal-suspended', true);
            
            config.state_id == 1 || config.state_id == 2 ? modal.setAttribute('modalTodo', '') : null;
            

            modal.className = 'suspendedDesign';

            const h1 = document.createElement('h1');

            const p = document.createElement('p');
            p.style.backgroundColor = `${this.pointerColor(config)}`;

            modal.appendChild(divTitle);
            divTitle.append(h1, p);

            h1.innerText = config.description;
            p.innerText = config.state_description;

            console.log(config);

            modal.appendChild(this.modalRegisterReason(config));
            const modalRegister = new Modal();
            return modalRegister.modalDark({modal:modal});
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     * Seleciona a cor com base no estado da tarefa.
     * @param {Object} config - Configurações para a cor.
     * @param {number} config.state_id - ID do estado da tarefa.
     * @param {string} config.color - Cor da tarefa.
     * @returns {string} - Cor selecionada.
     */
    pointerColor(config) {
        if (config.state_id == 1) return `#${this.bdColor[0].color}`;
        if (config.state_id == 2) return `#${this.bdColor[1].color}`;
    }

    /**
     * Cria um botão para atualizar o estado da tarefa.
     * @param {Object} config - Configurações para o botão.
     * @param {number} config.state_id - ID do estado da tarefa.
     * @param {number} config.id - ID da tarefa.
     * @returns {HTMLElement} - Elemento HTML do botão.
     */
    buttonPut(config) {
        try{
            const btnSave = new Button();
            const configBtnSave = {...saveButton, onAction: async () => {
                let connection = new Connection();
                if(config.state_id == 4 || config.state_id == 3) {
                    let result = await connection.put({days:null, reason: null, task_id: config.id}, 'GTPP/TaskState.php');
                    if(!result.error) {
                        const modal = new Modal();
                        modal.openModal('Enviado com sucesso!', 'Tarefa desarquivada com sucesso!', document.querySelector("#containerMain section"), 1);
                    }
                } else if (config.state_id == 5) {
                    let result = await connection.put({reason: null, ...this}, 'GTPP/TaskState.php');
                    if(!result.error) {
                        const modal = new Modal();
                        modal.openModal('Enviado com sucesso!', 'Tarefa desarquivada com sucesso!', document.querySelector("#containerMain section"), 1);
                    }
                } 
            }};
        return btnSave.Button(configBtnSave);
        }catch (error) {
            console.error(error.message);
        }
    }

    /**
     * Cria um modelo de card com uma caixa de texto.
     * @param {Object} config - Configurações para o modelo.
     * @param {number} config.state_id - ID do estado da tarefa.
     * @returns {HTMLElement} - Elemento HTML do modelo.
     */
    modalRegisterReason(config) {
        try {
            const div = document.createElement('div');
            div.className = 'divModalReason';
            
            if(config.state_id == 1 || config.state_id == 2 || config.state_id == 6){
                div.appendChild(this.textArticleSuspended(config));
                div.setAttribute('modal-reason', true);

            } else if(config.state_id == 5) {
                this.inputFormBlocked(div, config);
                div.appendChild(this.buttonPut(config));
            } else {
                div.appendChild(this.buttonPut(config));
            }
            return div;
        } catch (error) {
            console.error(error.message);
        }
    }

    
    /**
     * Define o número de dias para a tarefa.
     * @param {string} days - Número de dias.
     * @param {Object} config - Configurações para os dias.
     * @param {string} config.id - ID da tarefa.
     */
    setDays(days, config) {
       try {
            this.days = days;
            this.reason = null;
            this.task_id = config.id;
            console.log(this);
       } catch (error) {
            console.error(error.message);
       }
    }

    /**
     * Cria um formulário de entrada para os dias.
     * @param {HTMLElement} local - Elemento HTML onde o formulário será inserido.
     * @param {Object} config - Configurações para o formulário.
     */
    inputFormBlocked(local, config) {
        try {
            const formObj = new Form();
            suspendedInput.listfields.onChange = value => this.setDays(value, config);
            local.appendChild(formObj.ContainerForm(suspendedInput));
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Cria uma área de texto para a tarefa suspensa.
     * @param {Object} config - Configurações para a área de texto.
     * @param {string} config.id - ID da tarefa.
     * @returns {HTMLElement} - Elemento HTML da área de texto.
     */
    textArticleSuspended(config) {
        const div = document.createElement('div');
        const h3 = document.createElement('h3');

        h3.innerText = `Deseja mesmo mudar o status para "parado"?`;

        const conn = new Connection();
        const textArea = new TextArea({
            text: this.reason, id: 'taskSuspended', onAction: async (text) => {
               try {
                let validateInput = document.querySelector('#taskSuspended textarea');

                if(validateInput.value.length > 0) {
                    const result = await conn.put({days: null, reason: text, task_id: config.id}, 'GTPP/TaskState.php');
                    if(!result.error) {
                        let modalTask = document.getElementById('modalTask');
                        const modal = new Modal();
                        modal.openModal('Enviado com sucesso!', 'Verifique a caixa de "parado!"', document.querySelector("#containerMain section"), 1);
                        modalTask.remove();
                    }
                }
               } catch (error) {
                    console.error(error.message);
               }
            }
        });
        
        div.append(h3, textArea.TextAreaEnable());
        return div;
    }
}
