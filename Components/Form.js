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
        try {
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
        } catch (error) {
            console.error(error.message);
        }
    }

    controllerElements(configs) {
        try {
            let response;
            switch (configs.type) {
                case 'select':
                    response = this.getSelectFieldWithLabel(configs);
                    break;
                default:
                    response = this.ItemForm(configs);
                    break;
            }
            return response;
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     * Cria e retorna um elemento html com as formatações básicas de um item de formulário (fieldset, div, label e input).
     * @date 10/01/2024 - 5:02:24 PM
     * @author Hygor Bueno
     * @param {Object} configs
     * @returns {HTMLFieldSetElement} Retorna um elemento html fieldset.
     */
    ItemForm(configs) {
        try {
            //Configurações do fieldset
            const fieldset = document.createElement('fieldset');
            //Adicação dos filhos.
            fieldset.appendChild(this.divSubContainer(this.label(configs), this.input(configs), configs));
            return fieldset;
        } catch (error) {
            console.error(error.message);
        }
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
        try {
            const subContainer = document.createElement('div');
            if (configs && configs.classItemsForm) {
                subContainer.className = configs.classItemsForm;
            }
            subContainer.appendChild(label);
            subContainer.appendChild(input);
            return subContainer;
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     * Cria e retorna um elemento html label pré-formatado.
     * @date 10/01/2024 - 5:18:16 PM
     * @author Hygor Bueno.
     * 
     * @param {Object} configs
     * @returns {HTMLInputElement} Retorna um elemento label
     */
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
     * @param {{inputType:string;inputId:string;requiredInput?:boolean;classInput?:string;onAction?:()=>;checked?:boolean,onClick?:()=>;onChange?:()=>}} configs
     * @returns {HTMLElement} Retorna um input pré-configurado.
     */
    input(configs) {
        try {
            if (!configs || !configs.inputType) {
                throw new Error('key inputType not found.');
            }
            const input = document.createElement('input');
            input.type = configs.inputType;
            input.checked = configs.checked;

            if (configs?.inputValue) input.value = configs.inputValue;
            if (configs?.inputId) input.id = configs.inputId;
            if (configs.requiredInput) input.dataset.required = 1;
            if (configs?.classInput) input.className = configs.classInput;
            if (configs?.onChange) input.addEventListener('keyup', (e) => { configs.onChange(e.target.value) });
            if (configs?.onAction) input.addEventListener('change', configs.onAction);
            if (configs?.onClick) input.addEventListener('click', configs.onClick);
            return input;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Componente reutilizavel pré montado.
     * @date 1/29/2024 - 4:54:44 PM
     *
     * @param {{label:string;options:string;iconLabel:string;requiredInput:bool;}} configs
     * @requires configs - necessario que as configurações que o label tenha um titulo e options tenha os seus valores para serem mostrados.
    */
    getSelectFieldWithLabel(configs) {
        try {
            if (!configs || !configs.label || !configs.options) throw new Error('Key label or options not found.');
            const fieldset = document.createElement('fieldset');
            const div = document.createElement('div');
            if (configs.iconLabel) fieldset.className = 'divLabelImg';
            fieldset.appendChild(div);
            div.appendChild(this.label(configs));
            if (configs.requiredInput) fieldset.appendChild(this.mandatory());
            fieldset.appendChild(this.getSelectSimple(configs));
            return fieldset;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Componente de criação de um select simples
     *
     * @param {{selectId:string;name:string;classSelect:string;onChange:()=>void;}} configs
     * @returns {*}
     */
    getSelectSimple(configs){
        try {
            const select = document.createElement('select');
            select.id = configs.selectId;
            select.name = configs.name;
            select.className = (configs.classSelect) ? configs.classSelect : 'inputForm';
            if (configs?.onChange) select.addEventListener('change', (e) => { configs.onChange(e.target.value); });
            this.getOptions(configs, select);
            return select;
        } catch (error) {
            console.log(error.message);
        }
    }


    /**
     * Componente reutilizável de options simples.
     *
     * @param {{options:[{value: string, text: string}];}} configs
     */
    getOptions(configs, select) {
       configs.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.text = option.text;
            select.appendChild(optionElement);
        });
    }

    simpleLabel(configs) {
        const label = document.createElement('label');
        label.className = configs.classLabel;
        label.innerText = configs.description;
        label.setAttribute('for', configs.for);
        return label;
    }
}