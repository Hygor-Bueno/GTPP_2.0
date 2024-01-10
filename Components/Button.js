import Util from "../Util.js";

export default class Button{
    util = new Util();
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
