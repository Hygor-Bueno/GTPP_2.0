import Util from '../Util.js';
export default class List{
    #listItems;
    #mandaroty = ["listItems"];


    constructor(configs){
        this.#listItems = configs.listItems;
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
        icon.src = `../Assets/Image/${item.icon}`;
        li.onclick = item.onAction;

        p.innerText = item.label;

        li.appendChild(icon);
        li.appendChild(p);
        return li;
    }
}