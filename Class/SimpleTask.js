import Form from "../Components/Form.js";
import Modal from "../Components/Modal.js";
import { dateInputConfig, registerInputs, selectConfigs, textInputName, textInputPriority } from "../Configuration/Configuration.js";

export default class SimpleTask{
    description;
    priority;
    initial_date;
    final_date;

    constructor(){
        this.registerModal();
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
        let form = formObj.ContainerForm(registerInputs);
        // local.appendChild(formObj.ContainerForm([{type:'select'}]))
        local.appendChild(form);
    }
 

    // inputsForm(local) {
    //     local.appendChild(this.inputRegisterNameTask());
    //     local.appendChild(this.selectForm());
    //     local.appendChild(this.dateInitial());
    //     local.appendChild(this.finalDate());
    // }

    selectForm() {
        const formSelectField = new Form();
        const configSelectField = selectConfigs;
        configSelectField.onAction = (e) => {
            if(e.target.value == "baixo") this.priority = 0;
            if(e.target.value == "medio") this.priority = 1;
            if(e.target.value == "alto") this.priority = 2;
            console.log(this.priority);
        };

        return formSelectField.selectField(configSelectField)
    }

    inputRegisterNameTask() {
        const formInputRegisterName = new Form();
        const configInputRegisterName = textInputName;
        configInputRegisterName.onAction = (e) => this.description = e.target.value;
        return formInputRegisterName.input(configInputRegisterName);
    }

    dateInitial() {
        const formInputDateInitial = new Form();
        const configInitialDate = dateInputConfig;
        configInitialDate.onAction = (e) => this.initial_date = this.validateDate(e.target.value);
        return formInputDateInitial.input(configInitialDate);
    }

    finalDate() {
        const formInputDateFinal = new Form();
        const configFinalDate = dateInputConfig;
        configFinalDate.onAction = (e) => this.final_date = this.finalDate(e.target.value);
        return formInputDateFinal.input(configFinalDate);
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