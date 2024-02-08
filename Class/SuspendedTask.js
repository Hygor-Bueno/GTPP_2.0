import Modal from "../Components/Modal.js";

export default class SuspendedTask {
    days = null;
    reason;
    task_id;
    
    suspended() {
        try {
            const modal = document.createElement('div');
            modal.setAttribute('modal-suspended', true);
            modal.className = 'suspendedDesign';
            modal.innerText = 'Hello world!';

            const modalRegister = new Modal();
            return modalRegister.modalDark({modal:modal});
            
        } catch (error) {
            console.error(error.message);
        }
    }
}