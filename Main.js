import Containers from "./Components/Containers.js";
import Form from "./Components/Form.js";
import Modal from "./Components/Modal/modal.js";

// Função auto excutável. Neste formato modular ela é a única função a ser excutada neste script.
(() => {
    const section = document.querySelector("#containerMain section");
    section.appendChild(login());
    section.appendChild(Modals());
}
)();

function login() {
    const loginContainer = new Containers();
    let form = new Form();
    return loginContainer.containerBasic(
        {
            id: 'loginContainer',
            element: form.ContainerForm({ classItemsForm: 'itemsForm',classForm:'form' })
        }
    );
}

function Modals() {
    const modalContainer = new Containers();
    let modal = new Modal();
    
    return modalContainer.containerBasic({
        id: 'modalContainer',
        element: modal.ContainerForm(),
    })
}