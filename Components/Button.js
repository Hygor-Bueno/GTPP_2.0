import { buttonAdd, buttonCSV, buttonPDF } from "../Configuration/Configuration.js";
import Util from "../Util.js";
import Form from "./Form.js";

/**
 * Classe Button
 * @date 10/01/2024 - 4:42:03 PM
 * @author Hygor Bueno.
 * @export
 * @class Button
 * @classdesc Um componente de botão criado para agilizar e padronizar os componentes da página. 
 */
export default class Button{
    #util = new Util();
    /**
     * Cria e retonar um elemento html button totalmente configurado.
     * @date 10/01/2024 - 4:44:45 PM
     * @author Hygor Bueno.
     * @param {{type:string;title:string;description:string;onAction:()=>,id?:string;classButton?:string}} configs
     * @returns {HTMLButtonElement} Elemento Button
     */
    Button(configs){
        try {
            let mandatory = ['type','title','description','onAction']; //Lista de chaves obrigatórias.
            let result = this.#util.ValidatKeysComponent(mandatory,configs); //Validação se as chaves obrigatórias se encontram nas configurações do objeto.
            if(!result) throw new Error(`is broken (${mandatory})`); //Tratativa de erro.
            // Criando o componente botão.
            const button = document.createElement('button');
            button.type = configs.type;
            (typeof configs.description == 'string') ? button.innerText = configs.description : button.appendChild(configs.description);
            button.title = configs.title;
            button.onclick = configs.onAction;
            if(configs?.id) button.id = configs.id;
            if(configs && configs.classButton) button.className = configs.classButton;
            return button;
        } catch (error) {
            console.error(error)
        }
    }

    
    /**
     * Description placeholder
     * @date 2/5/2024 - 12:29:57 PM
     * @author Jonatas silva
     *
     * @param {object} local
     * @param {string} id
     * @param {function} onPDF
     * @param {function} onCSV
     * @param {function} reloadTaskList
     */
    configButton(local, id, onPDF, onCSV, reloadTaskList) {
        const icon = new Form();
        const btn = new Button();
        const createButton = (config) => local.appendChild(btn.Button(config));        
        const addButton = config => id === 'task_state_1' && createButton(config);
        createButton({ ...buttonPDF, onAction: onPDF, description: icon.iconLabel('PDF.svg') });
        createButton({ ...buttonCSV, onAction: onCSV, description: icon.iconLabel('csv.svg') });
        addButton({ ...buttonAdd, onAction: () => reloadTaskList(id), description: icon.iconLabel('ADD.svg') });
    }

    // componentImage(srcImage, title) {
    //     const image = document.createElement('img');
    //     title && (image.title = `${title}`);
    //     image.src = `../Assets/Image/${srcImage}`;
    //     return image;
    // }
    
}
