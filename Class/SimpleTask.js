import Form from "../Components/Form.js";
import Modal from "../Components/Modal.js";

import { registerInputs } from "../Configuration/Configuration.js";

export default class SimpleTask{
    description;
    priority;
    initial_date;
    final_date;

    constructor(){
        this.registerModal();
    }

    setDescription(description){
        this.description = description;
        console.log(this)
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

    registerModal() {
        const modal1 = document.createElement('div');
        modal1.className = 'modal-register1';

        const modal2 = document.createElement('div');
        modal2.className = 'modal-register2';

        modal1.appendChild(modal2);
        this.inputsForm(modal2);

        const modalRegister = new Modal();
        return modalRegister.modalDark(modal1);
    }

    inputsForm(local) {
        const formObj = new Form();
        for (let i = 0; i < registerInputs.listfields.length; i++) {
            registerInputs.listfields[i].onChange = (value) => {
                switch (i) {
                    case 0:
                        this.setDescription(value);
                        break;
        
                    case 1:
                        this.setInitialDate(value);
                        break;
                    
                    case 2:
                        this.setFinalDate(value);
                        break;
                    
                    case 3:
                        this.setPriority(value);
                        break;
        
                    default:
                        console.log('erro');
                        break;
                }
            };
        }
        

        let form = formObj.ContainerForm(registerInputs);
        local.appendChild(form);
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