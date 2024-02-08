import Button from "../Components/Button.js";
import Form from "../Components/Form.js";
import Modal from "../Components/Modal.js";
import {saveButton} from "../Configuration/Configuration.js";
import {Connection} from "../Connection/Connection.js";

import { registerInputs } from "../Configuration/Configuration.js";


/** Classe que representa uma tarefa simples
 *  @author Jonatas Silva.
 *  @example const test = new SimpleTest();
 */
export default class SimpleTask{
    description;
    priority;
    initial_date;
    final_date;

    /**
     * Cria uma instância de SimpleTask.
     * @constructor
     * @param {string} description - Descrição da tarefa.
     * @param {string} priority - Prioridade da tarefa.
     * @param {string} initial_date - Data de início da tarefa.
     * @param {string} final_date - Data de término da tarefa.
     */
    constructor(description,priority,initial_date,final_date,){
        this.description = description;
        this.priority = priority;
        this.initial_date = initial_date;
        this.final_date = final_date;
    }

    /**
     * Define a descrição da tarefa.
     * @example
     * task.setDescription('Nova descrição da tarefa');
     */
    setDescription(description){
        this.description = description;
        console.log(this);
    }

    /**
     * Define a data de início da tarefa.
     * @example
     * task.setInitialDate('2024-02-05');
     */
    setInitialDate(initial_date){
        this.initial_date = initial_date;
        console.log(this);
    }
    
    /**
     * Define a data de término da tarefa.
     * @example
     * task.setFinalDate('2024-02-10');
     */
    setFinalDate(final_date){
        this.final_date = final_date;
        console.log(this);
    }


    /**
     * Define a prioridade da tarefa.
     * @param {string} priority - Nova prioridade da tarefa.
     * @example
     * task.setPriority('Alta');
     */
    setPriority(priority){
        this.priority = priority;
        console.log(this);
    }

    /**
     * Registra a tarefa usando um modal.
     * @example
     * const modalElement = task.registerModal(taskList, document.getElementById('modalContainer'), assistFunction);
     */
    registerModal(taskList, local, funcAss) {
        try{

            const modal1 = document.createElement('div');
            modal1.setAttribute('modal-tasks', true);
            modal1.className = 'modal-register1';
            
            const modal2 = document.createElement('div');
            modal2.className = 'modal-register2';
            const modal3 = document.createElement('div');
            modal3.className = 'modal-register3';
            
            const btnSave = new Button();
            const configBtnSave = {...saveButton, onAction: async () => {
                let connection = new Connection();
                let result = await connection.post(this, 'GTPP/Task.php');
                await this.modalLauncher(result, taskList, local, funcAss);
            }}
            
            modal1.appendChild(modal2);
            this.inputsForm(modal2);
            modal2.appendChild(modal3);
            modal3.appendChild(btnSave.Button(configBtnSave));
            const modalRegister = new Modal();
            return modalRegister.modalDark({modal:modal1});
        }catch(e){
            console.error(e);
        }
    }
    
    async modalLauncher(result, taskList, local, funcAss) {
        console.log('Ola mundo!')
        let inputRegisterTask = document.getElementById('registerInput');
        let initialDate = document.getElementById('initialDate');
        let finalDate = document.getElementById('finalDate');
        let priority = document.getElementById('priority');
        const modelos = [inputRegisterTask, initialDate, finalDate, priority];
        
        if(!result.error) {
            taskList.push({id: result.last_id, ...this});
            local.appendChild(await funcAss());
            const modal = new Modal();
            modal.openModal('Tarefa registrada!', 'Parabéns uma nova tarefa já foi registrada com sucesso!', document.querySelector("#containerMain section"), 1);
        } else  {
            modelos.forEach((element) => {
                if(element.value.length <= 0) element.classList.add("borderRequired");
                if(element.value.length > 0 || element.value !== '') element.classList.remove("borderRequired");
            })
        }
    }

    inputsForm(local) {
        const formObj = new Form();
        registerInputs.listfields.forEach((field, i) => {
            field.onChange = value => {
                switch (i) {
                    case 0: this.setDescription(value); break;
                    case 1: this.setInitialDate(value); break;
                    case 2: this.setFinalDate(value); break;
                    case 3: this.setPriority(value); break;
                    default: console.log('erro é necessario enviar uma nova função!');
                }
            };
        });
        local.appendChild(formObj.ContainerForm(registerInputs));
    }
}