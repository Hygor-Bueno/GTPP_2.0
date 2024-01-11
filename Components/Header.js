import Title from "./Title.js";

export default class Header{
    #text;
    constructor(text){
        this.#text = text;
    }
    main(){
        const header = document.createElement('header');
        const title = new Title(this.#text);
        header.appendChild(title.main());
        return header;
    }
}