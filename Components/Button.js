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

    createSvg() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("height", "24");
        svg.setAttribute("viewBox", "0 -960 960 960");
        svg.setAttribute("width", "24");
        svg.setAttribute("fill", "#000");
        svg.setAttribute('class', "svgArchived");
    
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "m480-240 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160ZM200-640v440h560v-440H200Zm0 520q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v499q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm264 300Z");
    
        svg.appendChild(path);
    
        return svg;
    }
    
    
    
}
