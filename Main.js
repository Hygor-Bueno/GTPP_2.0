import Containers from "./Components/Containers.js";

// Função auto excutável. Neste formato modular ela é a única função a ser excutada neste script.
(() => {
    const section = document.querySelector("#containerMain section");
    section.appendChild(login());
}
)();

function login() {
    const loginContainer = new Containers();
    return loginContainer.containerBasic({ id: 'loginContainer' });
}