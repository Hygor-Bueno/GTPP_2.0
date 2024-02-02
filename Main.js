import Router from "./Routers/Router.js";

init();

/**
 * Função auto excutável. Neste formato modular ela é a única função a ser excutada neste script.
 * @date 11/01/2024 - 9:18:35 AM
 * @author Hygor Bueno.
 * @async
 */
async function init() {
    const router = new Router();
    router.navigation("Home");
};
