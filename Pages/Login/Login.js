import User from "../../Class/User.js";
import { buttonLogin, inputsLogin } from "../../Configuration/Configuration.js";
import { Connection } from "../../Connection/Connection.js";
import IndexedDBManager from "../../Connection/IndexedDBManager.js";
import Util from "../../Util.js";
import Button from "../../Components/Button.js";
import Containers from "../../Components/Containers.js";
import Form from "../../Components/Form.js";
import Router from "../../Routers/Router.js";

/**
 * Página de login
 * @date 1/11/2024 - 5:26:52 PM
 * @author Hygor Bueno.
 * @export
 * @class Login
 */
export default class Login {
    /**
     * Cria o componente de login.
     * @date 11/01/2024 - 9:18:54 AM
     * @author Hygor Bueno.
     *
     */
    login() {
        const loginContainer = new Containers();
        const formObj = new Form();
        let form = formObj.ContainerForm(inputsLogin);

        const buttonObj = new Button();
        let confgBtn = buttonLogin;
        confgBtn.onAction = async ()=>await this.accountAccess();
        form.appendChild(buttonObj.Button(confgBtn));

        return loginContainer.containerBasic({ id: 'loginContainer', element: form });
    }

    /**
     * Método para acesar a conta;
     * @date 11/01/2024 - 9:24:34 AM
     * @author Hygor Bueno.
     * @async
     */
    async accountAccess() {
        try {
            const util = new Util();
            const router = new Router();
            util.validateMandatoryFields();
            let response = await this.executeLogin();
            //Tratativa de erro para falha no login.
            if (response.error) throw new Error(response.message);
            //Limpa os campos de inputs.
            new Util().cleanInputs("#loginContainer form input");

            //Salva os dados no localstorage.
            localStorage.setItem('userGTPP', response.data.id);
            localStorage.setItem('tokenGTPP', response.data.session);

            let verifyDataUser = await this.getUser(parseInt(response.data.id));
            if (verifyDataUser.error && verifyDataUser.message.toLowerCase().includes('not found')) await this.saveUserInIndexedDB(response);
            await router.navigation('Home');
        } catch (error) {
            console.log(error);
        }
    }

    async saveUserInIndexedDB(user) {
        const userData = new User(user.data.id, user.data.session);
        await userData.loadInfo();

        let db = new IndexedDBManager();
        await db.openDatabase();
        await db.addUser(userData);

    }

    async executeLogin() {
        //Captura o valor dos campos e atribui a duas váriáveis.
        const username = document.getElementById('userInput').value;
        const password = document.getElementById('passwordInput').value;

        //Abre a conexão e cria o objeto a ser enviado.
        const connection = new Connection();
        const user = { user: username, password };
        return connection.postLogin(user, "CCPP/Login.php");
    }

    /**
     * Ao realizar o logoff esse método ira excluir seus dados do indexed db e excluir as chaves no local storage.
     * @date 11/01/2024 - 9:26:00 AM
     * @author Hygor Bueno.
     *
     * @async
     */
    async logoff() {
        let db = new IndexedDBManager();
        await db.openDatabase();
        await db.deleteUserForID(parseInt(localStorage.getItem('userGTPP')) || 0);
        localStorage.removeItem('userGTPP');
        localStorage.removeItem('tokenGTPP');
    }

    /**
     * Esse método busca o usuário no indexedDB apartir do id que é passado via parâmetro. 
     * @date 11/01/2024 - 9:27:41 AM
     *
     * @async
     * @param {number} idUser
     * @returns {object}
     */
    async getUser(idUser) {
        let db = new IndexedDBManager();
        await db.openDatabase();

        let user = await db.getUserForID(idUser);
        return user;
    }
}