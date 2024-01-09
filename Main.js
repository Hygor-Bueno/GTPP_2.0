import Button from "./Components/Button.js";
import Containers from "./Components/Containers.js";
import Form from "./Components/Form.js";
import Modal from "./Components/Modal/modal.js";
import { buttonLogin, inputsLogin } from "./Configuration/Configuration.js";
import { Connection } from "./Connection/Connection.js";
import Util from "./Util.js";

// Função auto excutável. Neste formato modular ela é a única função a ser excutada neste script.
(() => {
    const section = document.querySelector("#containerMain section");
    section.appendChild(login());
    section.appendChild(modalGender());
}
)();

function login() {
    const loginContainer = new Containers();
    const formObj = new Form();
    let form = formObj.ContainerForm(inputsLogin);

    const buttonObj = new Button();
    let confgBtn = buttonLogin;
    confgBtn.onAction = accountAccess;
    form.appendChild(buttonObj.Button(confgBtn));

    return loginContainer.containerBasic({ id: 'loginContainer', element: form });
}

function modalGender() {
    const modal = new Modal();
    return modal.OpenModal('Erro!!', 'Ocorreu um erro!', true);
}

async function accountAccess() {
    const username = document.getElementById('userInput').value;
    const password = document.getElementById('passwordInput').value;
    const connection = new Connection();
    const user = { user: username, password };
    let response = await connection.postLogin(user, "CCPP/Login.php");
    console.log(response);
    const util = new Util().cleanInputs("#loginContainer form input");
}