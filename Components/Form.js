export default class Form {
    ContainerForm(configs) {
        const form = document.createElement('form');
        configs.forEach(config => {form.appendChild(this.ItemForm(config.listfields))});
        if (configs && configs.classForm) form.className = configs.classForm;
        return form;
    }
    
    ItemForm(configs) {        
        //Configurações do fieldset
        const fieldset = document.createElement('fieldset');

        //Adicação dos filhos.
        configs.forEach(config => {fieldset.appendChild(this.DivSubContainer(this.Label(config), this.Input(config), config));});
        return fieldset;
    }

    DivSubContainer(label, input, configs) {
        const subContainer = document.createElement('div');
        if (configs && configs.classItemsForm) {
            subContainer.className = configs.classItemsForm;
        }
        subContainer.appendChild(label);
        subContainer.appendChild(input);
        return subContainer;
    }

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