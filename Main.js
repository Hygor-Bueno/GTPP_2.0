import Containers from "./Components/Containers.js";
import { modal } from "./components/Modal/modal.js";

// Função auto excutável. Neste formato modular ela é a única função a ser excutada neste script.
(() => {
    const section = document.querySelector("#containerMain section");
    section.appendChild(login());
    let button = document.querySelector("#containerMain section button");
    button.addEventListener("click",modal);
}
)();

function login() {
    const loginContainer = new Containers();
    return loginContainer.containerBasic({ id: 'loginContainer' });
}

function mostrarModal() {
    // Chama a função modal que cria e adiciona o modal à tela
    modal();
    
    // Obtém o modal e o exibe
    const modalElement = document.querySelectorAll('.modal');
    modalElement.style.display = 'block';
}