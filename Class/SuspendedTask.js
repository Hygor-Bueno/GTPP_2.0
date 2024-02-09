import Button from "../Components/Button.js";
import Form from "../Components/Form.js";
import Modal from "../Components/Modal.js";
import TextArea from "../Components/TextArea.js";
import {saveButton} from "../Configuration/Configuration.js";
import { suspendedInput } from "../Configuration/Configuration.js";
import { Connection } from "../Connection/Connection.js";

export default class SuspendedTask {
    days = null;
    reason;
    task_id;
    
    suspended(config) {
        try {
            const modal = document.createElement('div');
            modal.setAttribute('modal-suspended', true);
            modal.className = 'suspendedDesign';

            const h1 = document.createElement('h1');
            modal.appendChild(h1);

            h1.innerText = config.description;

            console.log(config);

            modal.appendChild(this.modalRegisterReason(config));
            const modalRegister = new Modal();
            return modalRegister.modalDark({modal:modal});
        } catch (error) {
            console.error(error.message);
        }
    }

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
            }}
        return btnSave.Button(configBtnSave);
        }catch (error) {
            console.error(error.message);
        }
    }

    modalRegisterReason(config) {
        try {
            const div = document.createElement('div');
            div.className = 'divModalReason';
            console.log(config);
            
            if(config.state_id == 1 || config.state_id == 2 || config.state_id == 6){
                div.appendChild(this.textArticleSuspended(config));
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

    setDays(days, config) {
        this.days = days;
        this.reason = null;
        this.task_id = config.id;
        console.log(this);
    }


    inputFormBlocked(local, config) {
        try {
            const formObj = new Form();
            suspendedInput.listfields.onChange = value => this.setDays(value, config);
            local.appendChild(formObj.ContainerForm(suspendedInput));
        } catch (error) {
            console.error(error);
        }
    }


    textArticleSuspended(config) {
        const div = document.createElement('div');
        const conn = new Connection();
        const textArea = new TextArea({
            text: this.reason, id: 'taskSuspended', onAction: async (text) => {
               try {
                const result = await conn.put({days: null, reason: text, task_id: config.id}, 'GTPP/TaskState.php');
                if(!result.error) {
                    const modal = new Modal();
                    modal.openModal('Enviado com sucesso!', 'Tarefa desarquivada com sucesso!', document.querySelector("#containerMain section"), 1);
                }
                
               } catch (error) {
                    console.error(error.message);
               }
            }
        });
        
        div.appendChild(textArea.TextAreaEnable());
        return div;
    }
}