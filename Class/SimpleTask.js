import Containers from "../Components/Containers.js";
import Form from "../Components/Form.js";
import Modal from "../Components/Modal.js";
import { dateInputConfig, registerInputs, textInputName, textInputPriority } from "../Configuration/Configuration.js";

export default class SimpleTask{
    description;
    priority;
    initial_date;
    final_date;
    
    // description,priority,initial_date,final_date
    constructor(){
        // this.description = prompt('Nome da tarefa',description);
        // this.priority = prompt('prioridade',priority);
        // this.initial_date = prompt('Data inicial',initial_date);
        // this.final_date = prompt('Data final',final_date);

        this.registerModal();
    }

    registerModal() {
        const modal1 = document.createElement('div');
        modal1.className = 'modal-register1';

        const modal2 = document.createElement('div');
        modal2.className = 'modal-register2';

        modal1.appendChild(modal2);
        this.inputsForm();

        const modalRegister = new Modal();
        return modalRegister.modalDark(modal1);
    }

    inputsForm() {
       const registerContainer = new Containers();
       const formObj = new Form();
       let form = formObj.ContainerForm(registerInputs);

       return registerContainer.containerBasic({ id: 'registerContainerInputs', element: form })
    }


    validateDate(){
        try {
            if(this.initial_date > this.final_date) throw new Error('Invalid date');
        } catch (error) {
            console.error(error.message);
        }
    }

    validateIsEmpty(){
        try {
            if(this.description.length <= 0) throw new Error('Invalid description');
        } catch (error) {
            console.error(error.message);
        }
    }

    validatePriority() {
        try{
            if(this.priority.length <= 0) throw new Error('Invalid priority');
        } catch (error) {
            console.error(error.mesage);
        }
    }

    validateFinalDate() {
      try {
        if(this.final_date < this.initial_date) throw new Error('Invalid final_date');
      } catch (error) {
        console.error(error.message);
      }
    } 
    
}