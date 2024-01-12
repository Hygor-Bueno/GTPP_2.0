export default class List{
    #listItems;
    #mandaroty = ["listItems"];
    #linkItem;
    #labelItem;

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

    li(elementItem){
        const li = document.crea
    }
}