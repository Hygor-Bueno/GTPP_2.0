import Util from '../Util.js';
export default class List{
    #listItems;
    #mandaroty = ["listItems"];


    constructor(configs){
        try {
            const util = new Util();
            let result = util.ValidatKeysComponent(this.#mandaroty,configs);
            console.log(result);
            this.#listItems = configs.listItems;
        } catch (error) {
            
        }
    }
    
    ul(){
        const ul = document.createElement('ul');
        this.#listItems.forEach(item => {
            ul.appendChild(this.li(item));
        });
        return ul;
    };

    li(item){
        const li = document.createElement('li');
        li.innerText = item.label;
        return li;
    }
}