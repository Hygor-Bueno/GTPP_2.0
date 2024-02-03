import Button from "../Components/Button.js";
import Form from "../Components/Form.js";
import Modal from "../Components/Modal.js";
import {saveButton} from "../Configuration/Configuration.js";
import {Connection} from "../Connection/Connection.js";

import { registerInputs } from "../Configuration/Configuration.js";

export default class SimpleTask{
    description;
    priority;
    initial_date;
    final_date;

    constructor(description,priority,initial_date,final_date,){
        this.description = description;
        this.priority = priority;
        this.initial_date = initial_date;
        this.final_date = final_date;
    }

    setDescription(description){
        this.description = description;
        console.log(this);
    }

    setInitialDate(initial_date){
        this.initial_date = initial_date;
        console.log(this);
    }
    
    setFinalDate(final_date){
        this.final_date = final_date;
        console.log(this);
    }

    setPriority(priority){
        this.priority = priority;
        console.log(this);
    }

    registerModal(taskList, local, funcAss) {
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
            this.modalLauncher(result, taskList, local, funcAss);
        }}
        modal1.appendChild(modal2);
        this.inputsForm(modal2);
        modal2.appendChild(modal3);
        modal3.appendChild(btnSave.Button(configBtnSave));
        const modalRegister = new Modal();
        return modalRegister.modalDark(modal1);
    }

    modalLauncher(result, taskList, local, funcAss) {
        if(!result.error) {
            taskList.push({id: result.last_id, ...this});
            local.appendChild(funcAss());
            const modal = new Modal();
            modal.openModal('Tarefa registrada!', 'Parabéns uma nova tarefa já foi registrada com sucesso!', document.querySelector("#containerMain section"), 1);
        } else  {
            let inputRegisterTask = document.getElementById('registerInput');
            let initialDate = document.getElementById('initialDate');
            let finalDate = document.getElementById('finalDate');
            let priority = document.getElementById('priority');
            [inputRegisterTask, initialDate, finalDate, priority].forEach((element) => {if(element.value.length <= 0) element.classList.add("borderRequired")})
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