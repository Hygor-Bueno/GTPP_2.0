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
        if (configs.listfields.length > 0) {
            configs.listfields.forEach(itemConfig => {
                form.appendChild(this.controllerElements(itemConfig));
            });
        } else {
            form.appendChild(this.controllerElements(configs.listfields));
        }
        if (configs && configs.classForm) form.className = configs.classForm;
        return form;
    }

    controllerElements(configs) {
        let response;
        switch (configs.type) {
            case 'select':
                response = this.selectFieldWithLabel(configs);
                break;
            default:
                response = this.ItemForm(configs);
                break;
        }
        return response;
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
        fieldset.appendChild(this.divSubContainer(this.label(configs), this.input(configs), configs));
        return fieldset;
    }


    ItemSelectForm(configs) {
        const select = document.createElement('select');
        const option = document.createElement('option');
        option.innerText = 'Selecione';
        option.hidden = true;
        option.value = '';
        option.selected = true;

        select.appendChild(option);
        return select;
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
    divSubContainer(label, input, configs) {
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
    label(configs) {
        try {
            if (!configs || !configs.label) {
                throw new Error('key label not found.');
            }
            const div = document.createElement('div');
            if (configs.iconLabel) div.className = 'divLabelForm';

            const label = document.createElement('label');
            label.innerText = configs.label;
            configs.iconLabel && div.appendChild(this.iconLabel(configs.nameImageLabel))
            div.appendChild(label);
            if (configs.requiredInput) div.appendChild(this.mandatory());
            label.className = (configs?.classLabel) ? configs.classLabel : 'labelForm';
            return div;
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * insere um Asterisco vermelho identificando que aquela caixa é obrigatória;
     * @date 11/01/2024 - 1:34:07 PM
     * @author Hygor Bueno.
     * @returns {HTMLLabelElement}
     */
    mandatory() {
        const label = document.createElement('label');
        label.innerText = '*';
        label.style.fontSize = 'var(--MainTitleSize)'
        label.style.color = 'var(--dangerColor)'
        return label;
    }

    iconLabel(nameImg) {
        const img = document.createElement('img');
        img.className = 'iconImg'
        img.src = `../Assets/Image/${nameImg}`;
        return img;
    }

    /**
     * Cria e retorna um elemento html input pré-formatado
     * @date 10/01/2024 - 5:20:20 PM
     * @author Hygor Bueno
     * @param {{inputType:string;inputId:string;requiredInput?:boolean;classInput?:string;onAction?:()=>;checked?:boolean}} configs
     * @returns {HTMLElement} Retorna um input pré-configurado.
     */
    input(configs) {
        console.log(configs)
        try {
            if (!configs || !configs.inputType) {
                throw new Error('key inputType not found.');
            }
            const input = document.createElement('input');
            input.type = configs.inputType;
            input.checked = configs.checked;

            if (configs?.inputValue) input.value = configs.inputValue;
            if (configs?.inputId) input.id = configs.inputId;
            if (configs?.onChange) input.addEventListener('change', (e) => { configs.onChange(e.target.value) });
            if (configs.requiredInput) input.dataset.required = 1;
            if (configs?.classInput) input.className = configs.classInput;
            if (configs?.onAction) input.addEventListener('change', configs.onAction);
            return input;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Description placeholder
     * @date 1/29/2024 - 4:54:44 PM
     *
     * @param {*} configs
     * @returns {*}
    */
    selectFieldWithLabel(configs) {
        try {
            if (!configs || !configs.label || !configs.options) {
                throw new Error('Key label or options not found.');
            }

            const fieldset = document.createElement('fieldset');

            const div = document.createElement('div');

            if (configs.iconLabel) fieldset.className = 'divLabelImg';
            const label = document.createElement('label');
            label.className = 'labelForm';
            label.innerText = configs.label;

            configs.iconLabel && div.appendChild(this.iconLabel(configs.nameImageLabel));
            fieldset.appendChild(div);
            div.appendChild(label);


            if (configs.requiredInput) fieldset.appendChild(this.mandatory());

            const select = document.createElement('select');
            select.id = configs.selectId;
            select.name = configs.name;
            select.className = (configs.classSelect) ? configs.classSelect : 'inputForm';
            if (configs?.onChange) select.addEventListener('change', (e) => { configs.onChange(e.target.value); });

            configs.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.text = option.text;
                select.appendChild(optionElement);
            });

            fieldset.appendChild(select);
            return fieldset;
        } catch (error) {
            console.error(error);
        }
    }

    simpleLabel(configs) {
        const label = document.createElement('label');
        label.className = configs.classLabel;
        label.innerText = configs.description;
        label.setAttribute('for', configs.for);
        return label;
    }
}