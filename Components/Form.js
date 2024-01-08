export default class Form {
    ContainerForm(configs) {
        const form = document.createElement('form');
        if(configs && configs.classForm) form.className = configs.classForm;
        form.appendChild(this.ItemForm(configs));
        return form;
    }
    ItemForm(configs) {
        //Configurações do fieldset
        const fieldset = document.createElement('fieldset');
        if(configs && configs.classItemsForm) fieldset.className = configs.classItemsForm;

        //Adicação dos filhos.
        fieldset.appendChild(this.Label({description:'Teste'}));
        fieldset.appendChild(this.Input({type:'number'}));
        return fieldset;
    }
    Label(configs) {
        try {
            if (!configs || !configs.description) { 
                throw new Error('key description not found.');
            }
            const label = document.createElement('label');
            label.innerText = configs.description;
            return label;
        } catch (error) {
            console.error(error)
        }
    }
    Input(configs) {
        try {
            if (!configs || !configs.type) { 
                throw new Error('key type not found.');
            }
            const input = document.createElement('input');
            input.type = configs.type;
            return input;
        } catch (error) {
            console.error(error)
        }
    }
}