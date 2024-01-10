/**
 * Classe Form
 * @date 10/01/2024 - 4:59:00 PM
 * @author Hygor Bueno.
 *
 * @export
 * @class Form
 * @classdesc Uma classe criada para retornar os elementos htmls mais comuns para a criação de um formulário (form, fieldset, inputs e etc).
 */
export default class Form {
    /**
     * Cria um elemento e retorna um elemento do tipo form;
     * @date 10/01/2024 - 5:02:24 PM
     * @author Hygor Bueno
     * @param {Object} configs
     * @returns {HTMLElement} Retorna um elemento html form.
     */
    ContainerForm(configs) {
        const form = document.createElement('form');
        configs.forEach(config => {form.appendChild(this.ItemForm(config.listfields))});
        if (configs && configs.classForm) form.className = configs.classForm;
        return form;
    }
    
     /**
     * Cria e retorna um elemento html com as formatações básicas de um item de formulário (fieldset, div, label e input).
     * @date 10/01/2024 - 5:02:24 PM
     * @author Hygor Bueno
     * @param {Object} configs
     * @returns {HTMLFieldSetElement} Retorna um elemento html fieldset.
     */
    ItemForm(configs) {        
        //Configurações do fieldset
        const fieldset = document.createElement('fieldset');

        //Adicação dos filhos.
        configs.forEach(config => {fieldset.appendChild(this.DivSubContainer(this.Label(config), this.Input(config), config));});
        return fieldset;
    }

    /**
     * Cria e retorna um elemento html com as formatações básicas de container de um item de formulário (div, label e input).
     * @date 10/01/2024 - 5:15:48 PM
     * @author Hygor Bueno
     * 
     * @param {String} label
     * @param {HTMLInputElement} input
     * @param {Object} configs
     * @returns {HTMLElement}
     */
    DivSubContainer(label, input, configs) {
        const subContainer = document.createElement('div');
        if (configs && configs.classItemsForm) {
            subContainer.className = configs.classItemsForm;
        }
        subContainer.appendChild(label);
        subContainer.appendChild(input);
        return subContainer;
    }

    /**
     * Cria e retorna um elemento html label pré-formatado.
     * @date 10/01/2024 - 5:18:16 PM
     * @author Hygor Bueno.
     * 
     * @param {Object} configs
     * @returns {HTMLInputElement} Retorna um elemento label
     */
    Label(configs) {
        try {
            if (!configs || !configs.label) {
                throw new Error('key label not found.');
            }
            const label = document.createElement('label');
            label.innerText = configs.label;
            if (configs?.classLabel) label.className = configs.classLabel;
            return label;
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Cria e retorna um elemento html input pré-formatado
     * @date 10/01/2024 - 5:20:20 PM
     * @author Hygor Bueno
     * @param {*} configs
     * @returns {HTMLElement} Retorna um input pré-configurado.
     */
    Input(configs) {
        try {
            if (!configs || !configs.inputType) {
                throw new Error('key inputType not found.');
            }
            const input = document.createElement('input');
            input.type = configs.inputType;
            input.id = configs.inputId
            if (configs?.classInput) input.className = configs.classInput;
            return input;
        } catch (error) {
            console.error(error)
        }
    }
}