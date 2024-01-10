import Util from "../Util.js";

/**
 * Classe Button
 * @date 1/10/2024 - 4:42:03 PM
 * @author Hygor Bueno.
 * @export
 * @class Button
 * @classdesc Um componente de botão criado para agilizar e padronizar os componentes da página. 
 */
export default class Button{
    util = new Util();
    
    /**
     * Description placeholder
     * @date 1/10/2024 - 4:44:45 PM
     * @author Hygor Bueno.
     * @param {Object} configs
     * @returns {HTMLElement} Elemento Button
     */
    Button(configs){
        try {
            let mandatory = ['type','title','description','onAction']; //Lista de chaves obrigatórias.
            let result = this.util.ValidatKeysComponent(mandatory,configs); //Validação se as chaves obrigatórias se encontram nas configurações do objeto.
            if(!result) throw new Error(`is broken (${mandatory})`); //Tratativa de erro.

            // Criando o componente botão.
            const button = document.createElement('button');
            button.type = configs.type;
            button.innerText = configs.description;
            button.title = configs.title;
            button.onclick = configs.onAction;
            if(configs && configs.classButton) button.className = configs.classButton;
            return button;
        } catch (error) {
            console.error(error)
        }
    }
    
}
