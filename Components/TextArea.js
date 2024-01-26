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
    #mandatory;
    /**
     * Creates an instance of TextArea.
     * @date 1/26/2024 - 10:28:56 AM
     *
     * @constructor
     * @param {{text?:string,class?:string}} configs
     */
    constructor(configs) {
        this.text = configs.text;
    }
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

        div.appendChild(this.buttonsTextArea())
        div.appendChild(this.componentTextArea());
        return div;
    }

    buttonsTextArea() {
        const button = new Button();
        return button.Button({
            type: 'button',
            title: 'Editar area de texto',
            description: 'Editar',
            onAction: (e) => {
                e.target.innerText = this.disabled ? 'Salvar' : 'Editar';
                console.log(e.target.innerText);
                this.disabled = false;
                if (document.getElementById('textArea')) {
                    document.querySelector('#textArea > textarea').removeAttribute('disabled');
                }
            }
        });
    }
}