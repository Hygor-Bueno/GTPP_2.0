import Button from "../Components/Button.js";
import Form from "../Components/Form.js";
import Modal from "../Components/Modal.js";
import { saveButton } from "../Configuration/Configuration.js";
import { Connection } from "../Connection/Connection.js";
import { registerInputs } from "../Configuration/Configuration.js";

/** Classe que representa uma tarefa simples.
 *  @author Jonatas Silva.
 *  @example const test = new SimpleTest();
 */
export default class SimpleTask {
    /**
     * Cria uma nova instância de SimpleTask.
     * @param {string} description - Descrição da tarefa.
     * @param {string} priority - Prioridade da tarefa.
     * @param {string} initial_date - Data de início da tarefa.
     * @param {string} final_date - Data de término da tarefa.
     */
    constructor(description, priority, initial_date, final_date) {
        this.description = description;
        this.priority = priority;
        this.initial_date = initial_date;
        this.final_date = final_date;
    }

    /**
     * Define a descrição da tarefa.
     * @param {string} description - Nova descrição da tarefa.
     * @example
     * task.setDescription('Nova descrição da tarefa');
     */
    setDescription(description) {
        this.description = description;
        console.log(this);
    }

     /**
     * Define a prioridade da tarefa.
     * @param {string} priority - Nova prioridade da tarefa.
     * @example
     * task.setPriority('Alta');
     */
     setPriority(priority) {
        this.priority = priority;
        console.log(this);
    }

    /**
     * Define a data de início da tarefa.
     * @param {string} initial_date - Nova data de início da tarefa.
     * @example
     * task.setInitialDate('2024-02-05');
     */
    setInitialDate(initial_date) {
        this.initial_date = initial_date;
        console.log(this);
    }

    /**
     * Define a data de término da tarefa.
     * @param {string} final_date - Nova data de término da tarefa.
     * @example
     * task.setFinalDate('2024-02-10');
     */
    setFinalDate(final_date) {
        this.final_date = final_date;
        console.log(this);
    }

    /**
     * Registra a tarefa usando um modal.
     * @param {any[]} taskList - Lista de tarefas.
     * @param {HTMLElement} local - Elemento HTML onde o modal será inserido.
     * @param {()=>any} funcAss - Função de assistência.
     * @returns {HTMLElement} - Elemento HTML do modal.
     * @example
     * const modalElement = task.registerModal(taskList, document.getElementById('modalContainer'), assistFunction);
     */
    registerModal(taskList, local, funcAss) {
        try {
            const modal = document.createElement('div');
            modal.setAttribute('modal-tasks', true);
            modal.className = 'modal-register';
            const btnSave = new Button();
            const configBtnSave = {...saveButton, onAction: async () => {
                let connection = new Connection();
                let result = await connection.post(this, 'GTPP/Task.php');
                await this.modalLauncher(result, taskList, local, funcAss);
            }};
            this.inputsForm(modal);
            modal.appendChild(btnSave.Button(configBtnSave));
            const modalRegister = new Modal();
            return modalRegister.modalDark({modal:modal});
        } catch(e) {
            console.error(e);
        }
    }
    
    /**
     * Abre o modal após o registro da tarefa.
     * @param {Object} result - Resultado do registro da tarefa.
     * @param {string[]} taskList - Lista de tarefas.
     * @param {HTMLElement} local - Elemento HTML onde o modal está localizado.
     * @param {()=>any} funcAss - Função de assistência.
     * @returns {void}
     * @async
     */
    async modalLauncher(result, taskList, local, funcAss) {
        let inputRegisterTask = document.getElementById('registerInput');
        let initialDate = document.getElementById('initialDate');
        let finalDate = document.getElementById('finalDate');
        let priority = document.getElementById('priority');
        let doc = document.getElementById('modalTask');
        
        if (!result.error) {
            taskList.push({id: result.last_id, ...this});
            local.appendChild(await funcAss());
            const modal = new Modal();
            modal.openModal('Tarefa registrada!', 'Parabéns uma nova tarefa já foi registrada com sucesso!', document.querySelector("#containerMain section"), 1);
            doc.remove();
        } else {
            [inputRegisterTask, initialDate, finalDate, priority].forEach((element) => {
                if (element.value.length <= 0) element.classList.add("borderRequired");
                if (element.value.length > 0 || element.value !== '') element.classList.remove("borderRequired");
            });
        }
    }

    /**
     * Adiciona campos de entrada ao formulário.
     * @param {HTMLElement} local - Elemento HTML onde o formulário será inserido.
     * @returns {void}
     * @example
     * task.inputsForm(document.getElementById('formContainer'));
     */
    inputsForm(local) {
        const formObj = new Form();
        registerInputs.listfields.forEach((field, index) => {
            field.onChange = (value) => {
                switch (index) {
                    case 0: this.setDescription(value); break;
                    case 1: this.setPriority(value); break;
                    case 2: this.setInitialDate(value); break;
                    case 3: this.setFinalDate(value); break;
                    default: console.log('Erro: é necessário enviar uma nova função!');
                }
            };

        });
        local.appendChild(formObj.ContainerForm(registerInputs));
    }
}