import Login from "./Components/Login/Login.js";

init();

/**
 * Função auto excutável. Neste formato modular ela é a única função a ser excutada neste script.
 * @date 11/01/2024 - 9:18:35 AM
 * @author Hygor Bueno.
 * @async
 * @returns {*}
 */
async function init() {
    const login = new Login();
    const validateLogin = await login.getUser(parseInt(localStorage.userGTPP) || 0);

    if (!validateLogin.error) {
        document.getElementById("loginContainer")?.remove();
        
    } else {
        const section = document.querySelector("#containerMain section");
        section.appendChild(login.login());
    }
};