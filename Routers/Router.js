
import { Connection } from "../Connection/Connection.js";
import Login from "../Pages/Login/Login.js";

export default class Router {
    async onToken() {
        const connection = new Connection();
        return connection.get(`&user_id=${localStorage.getItem("userGTPP")}&application_id=3`, "CCPP/Token.php");
    }
    async navigation(page) {
        const local = document.querySelector("#containerMain > section");
        local.innerHTML = '';

        const onToken = await this.onToken();
        if (onToken.error) page = "Login";

        switch (page) {
            case "Home":
                const title = document.createElement('h1');
                title.innerText = 'Welcome to Home!';
                local.appendChild(title);
                break;
            case "Login":
                const login = new Login();
                local.appendChild(login.login());
                break;
            default:
                console.log("Perdido")
        }
    }

}