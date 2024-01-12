import { buttonMenu, listItemsMenu } from "../Configuration/Configuration.js";
import Util from "../Util.js";
import Button from "./Button.js";
import Containers from "./Containers.js";
import List from "./List.js";

/**
 * Classe Menu, cria um componente de menu para nagegação no site.
 * @date 12/01/2024 - 4:50:57 PM
 * @author Hygor Bueno.
 * @export
 * @class Menu
 */
export default class Menu {
    #idNavMenu;
    #mandaroty = ["idNavMenu"];

    /**
     * Creates an instance of Menu.
     * @date 12/01/2024 - 4:51:45 PM
     * @author Hygor Bueno.
     *
     * @constructor
     * @param {object} configs
     */
    constructor(configs) {
        try {
            const util = new Util();
            let result = util.ValidatKeysComponent(this.#mandaroty, configs);
            if(!result)throw new Error("token idNavMenu is broken");
            this.#idNavMenu = configs.idNavMenu;
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Método utilizado para criar o componente nav.
     * @date 12/01/2024 - 4:51:55 PM
     * @author Hygor Bueno.
     *
     * @returns {*}
     */
    nav() {
        const container = new Containers();
        const list = new List(listItemsMenu);

        const nav = document.createElement('nav');
        nav.id = this.#idNavMenu;

        const button = new Button();
        buttonMenu.onAction = this.changeVisibilityOfModal;
        const elementButton = button.Button(buttonMenu);

        nav.appendChild(container.containerBasic({ element: elementButton }));
        nav.appendChild(list.ul());
        return nav;
    }

    /**
     * Método que altera a visibilidade do componente menu através da adição e remoção de classes.
     * @date 12/01/2024 - 4:52:42 PM
     * @author Hygor Bueno.
     */
    changeVisibilityOfModal() {
        const menu = document.getElementById("navMenu");
        const list = document.querySelector("#navMenu > ul");

        menu.classList.contains('closeNavMenu') ? menu.classList.remove('closeNavMenu') : menu.classList.add('closeNavMenu');
        list.classList.contains('closeListMenu') ? list.classList.remove('closeListMenu') : list.classList.add('closeListMenu');
    }
}