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
            console.log(config)
            const modal = document.createElement('div');
            const divTitle = document.createElement('div');
            // divTitle.setAttribute(this.colorStopPoint(config), '')

            //const listTaskState = await connection.get('', 'GTPP/TaskState.php');

            modal.setAttribute('modal-suspended', true);
            modal.className = 'suspendedDesign';

            const h1 = document.createElement('h1');

            const p = document.createElement('p');

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

    colorStopPoint(config) {
        const arrayBrackingState = ['todo', 'doing', 'analysis', 'stopped', 'blocked', 'done'];
        if(config.state_id == 1) return arrayBrackingState[0];
        if(config.state_id == 2) return arrayBrackingState[1];
        if(config.state_id == 3) return arrayBrackingState[2];
        if(config.state_id == 4) return arrayBrackingState[3];
        if(config.state_id == 5) return arrayBrackingState[4];
        if(config.state_id == 6) return arrayBrackingState[5];
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
        const h3 = document.createElement('h3');

        h3.innerText = `porque voce quer mudar esse status para ${config.state_id == 1 ? 'Arquivado' : config.state_id == 2 ? 'Arquivado' : config.state_id == 6 ? 'Fazer' : 'Aluma coisa'}?`

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
        
        div.append(h3, textArea.TextAreaEnable());
        return div;
    }
}