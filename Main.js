import Button from "./Components/Button.js";
import Containers from "./Components/Containers.js";
import Form from "./Components/Form.js";
import { buttonLogin, inputsLogin } from "./Configuration/Configuration.js";
import { Connection } from "./Connection/Connection.js";
import Util from "./Util.js";
import IndexedDBManager from './Connection/IndexedDBManager.js'
import User from "./Class/User.js";
// import Modals from "./Components/Modal/modal.js";
init();

// Função auto excutável. Neste formato modular ela é a única função a ser excutada neste script.
async function init() {
    const validateLogin = await getUser(parseInt(localStorage.userGTPP) || 0);
    if (!validateLogin.error) {
        document.getElementById("loginContainer")?.remove();
    } else {
        const section = document.querySelector("#containerMain section");
        section.appendChild(login());
    }
};

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

async function accountAccess() {
    try {
        //Captura o valor dos campos e atribui a duas váriáveis.
        const username = document.getElementById('userInput').value;
        const password = document.getElementById('passwordInput').value;

        //Abre a conexão e cria o objeto a ser enviado.
        const connection = new Connection();
        const user = { user: username, password };
        let response = await connection.postLogin(user, "CCPP/Login.php");

        //Tratativa de erro para falha no login.
        if (response.error) throw new Error(response.message);
        //Limpa os campos.
        new Util().cleanInputs("#loginContainer form input");
        localStorage.setItem('userGTPP', response.data.id);
        localStorage.setItem('tokenGTPP', response.data.session);


        const userData = new User(response.data.id, response.data.session);
        await userData.loadInfo();


        let db = new IndexedDBManager();
        await db.openDatabase();
        await db.addUser(userData);

        await init();

    } catch (error) {
        console.log(error);
    }
}

async function logoff(idUser) {
    let db = new IndexedDBManager();
    await db.openDatabase();
    db.deleteUserForID(idUser);
    localStorage.removeItem('userGTPP')
}

async function getUser(idUser) {
    let db = new IndexedDBManager();
    await db.openDatabase();

    let user = await db.getUserForID(idUser);
    return user;
}