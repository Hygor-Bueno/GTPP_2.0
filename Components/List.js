import Util from '../Util.js';
export default class List{
    #listItems;
    #mandaroty = ["listItems"];


    constructor(configs){
        try {
            const util = new Util();
            let result = util.ValidatKeysComponent(this.#mandaroty,configs);
          
            this.#listItems = configs.listItems;
        } catch (error) {
            console.error(error);
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
        const p = document.createElement('p');
        const icon = document.createElement('img');

        icon.className='iconMenu';
        icon.src = `../Assets/Image/${item.icon}`

        p.innerText = item.label;

        li.appendChild(icon);
        li.appendChild(p);
        return li;
    }
}