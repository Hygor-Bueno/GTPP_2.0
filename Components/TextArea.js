import Util from "../Util.js";
import Button from "./Button.js";

/**
 * Classe TextArea
 * @date 26/01/2024 - 9:52:57 AM
 * @author Hygor Bueno.
 *
 * @export
 * @class TextArea
 * @classdesc Classe destinada a criação de um componente chamado TextArea
 */
export default class TextArea {
    text;
    class;
    disabled = true;
    #mandatory=['id'];
    /**
     * Creates an instance of TextArea.
     * @date 1/26/2024 - 10:28:56 AM
     *
     * @constructor
     * @param {{text?:string,class?:string,id:string}} configs
     */
    constructor(configs) {
        try {
            const util = new Util();
            let result = util.ValidatKeysComponent(this.#mandatory,configs);
            console.log(result);
            if(!result) throw new Error('Not found token ID').
            this.text = configs.text;
        } catch (error) {
            console.error(error);
        }
    }
    /**
     * Método que cria a textarea
     * @date 1/26/2024 - 10:52:40 AM
     *
     * @returns {HTMLTextAreaElement}
     */
    componentTextArea() {
        const textarea = document.createElement('textarea');
        textarea.innerText = this.text;
        if (this.disabled) textarea.disabled = 'disabled';
        textarea.className = this.class || 'texteAreaDefault';
        return textarea;
    }
    /**
     * Método responsável por criar uma textarea que inicia desabilitada para edição e que possúi componentes para controle dela. 
     * @date 26/01/2024 - 9:54:39 AM
     *
     * @returns {HTMLElement}
     */
    TextAreaEnable() {
        const div = document.createElement('div');
        div.id = 'textArea';

        div.appendChild(this.buttonTextArea())
        div.appendChild(this.componentTextArea());
        return div;
    }

    buttonTextArea() {
        const button = new Button();
        return button.Button({
            type: 'button',
            title: 'Editar area de texto',
            description: 'Editar',
            classButton:`btn ${this.disabled ? 'btnDanger':'btnSuccess'}`,
            onAction: (e) => {
                e.target.innerText = this.disabled ? 'Salvar' : 'Editar';
                this.disabled = !this.disabled;
                e.target.className = `btn ${this.disabled ? 'btnDanger':'btnSuccess'}`
                if (document.getElementById('textArea')) {
                    const textarea = document.querySelector('#textArea > textarea');
                    this.disabled ? textarea.setAttribute('disabled','true') : textarea.removeAttribute('disabled');
                }
            }
        });
    }
}