
import Header from "../Components/Header.js";
import { Connection } from "../Connection/Connection.js";
import Login from "../Pages/Login/Login.js";
import Home from "../Pages/Home/Home.js";
import Loading from "../Components/Loading.js";
import Footer from "../Components/Footer.js";


/**
 * Classe de rotas.
 * @date 12/01/2024 - 9:14:47 AM
 * @author Hygor Bueno. 
 * @export
 * @class Router
 * @classdesc Essa função é composta por diversos métodos que auxiliam na navegação das páginas na nossa aplicação. 
 */
export default class Router {
    /**
     * Método responsável por validar o token do usuário. 
     * @date 12/01/2024 - 9:16:58 AM
     * @author Hygor Bueno.
     * @async
     * @returns {object}
     */
    async onToken() {
        let result = {error:true};
        if(localStorage.getItem('userGTPP') && localStorage.getItem('tokenGTPP')){
            const connection = new Connection();
            result = await connection.get(`&user_id=${localStorage.getItem("userGTPP")}&application_id=3`, "CCPP/Token.php");    
        }
        return result;
    }

    /**
     * Método responsável por realizar o gerenciamento das rotas de cada página.
     * @date 12/01/2024 - 9:17:53 AM
     * @author Hygor Bueno.
     * @async
     * @param {HTMLElement} page
     * @returns {HTMLElement}
     */
    async navigation(page) {
        const local = document.querySelector("#containerMain > section");
        local.innerHTML = '';

        const onToken = await this.onToken();
        if (onToken.error) page = "Login";

        switch (page) {
            case "Home":
                const home = new Home();
                this.pageBuild(local, home.main(),'Bem vindo a Home.');
                break;
            case "Login":
                const header = document.querySelector('#containerMain header');
                const footer = document.querySelector('#containerMain footer');

                if(header) header.remove();
                if(footer) footer.remove();

                const login = new Login();
                await login.logoff();
                local.appendChild(login.login());
                break;
            default:
                console.log("Perdido")
        }
    }

    /**
     * Método responsável por realizar a contrução da págian
     * @date 12/01/2024 - 9:18:19 AM
     * @author Hygor Bueno.
     * @param {HTMLElement} local
     * @param {HTMLElement} pageElement
    */
    async pageBuild(local, pageElement,titleHeader) {

        const header = new Header(titleHeader);
        const footer = new Footer('CLPP versão 1.0','Criado por Hygor Bueno e Jonatas');
 
        const isHeader = "#containerMain header";
        const container = document.querySelector("#containerMain");
        
        !document.querySelector(isHeader) && container.insertBefore(header.main(), container.lastElementChild);
        local.appendChild(await pageElement);
        container.appendChild(footer.main())
    }
}