import Util from '../Util.js';
import Containers from './Containers.js';
import Form from './Form.js';
export default class List {
    #listItems;
    #mandaroty = ["listItems"];

    constructor(configs) {
        if (configs?.listItems) this.#listItems = configs.listItems;
    }

    ul() {
        const ul = document.createElement('ul');
        this.#listItems.forEach(item => {
            ul.appendChild(this.li(item));
        });
        return ul;
    };

    li(item) {
        const li = document.createElement('li');
        const p = document.createElement('p');
        const icon = document.createElement('img');

        icon.className = 'iconMenu';
        icon.src = `../Assets/Image/${item.icon}`;
        li.onclick = item.onAction;

        p.innerText = item.label;

        li.appendChild(icon);
        li.appendChild(p);
        return li;
    }
    /**
     * Método responsável por criar os Itens das tarefas
     * @date 29/01/2024 - 9:14:52 AM
     * @param {{id:number;description:string;check:boolean;task_id:number;order:number;yes_no:number;file:number;note?:string;onAction?:()=>}} item
    */
    itemTask(item) {
        const li = document.createElement('li');
        const container = new Containers();
        const form = new Form();
              
        const label = document.createElement('label');
        label.setAttribute('for',`task_item_${item.id}`);
        label.innerText =item.description;
        
        const containerElement = container.containerBasic({element:form.input({inputType:'checkbox',inputId:`task_item_${item.id}`,checked:item.check,onAction:item.onAction})});
        containerElement.appendChild(label);

        li.appendChild(containerElement);
        return li;
    }
}