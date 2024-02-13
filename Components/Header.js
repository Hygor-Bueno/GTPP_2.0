import Title from "./Title.js";

export default class Header{
    #text;
    constructor(text){
        this.#text = text;
    }
    main(){
        try {
            const header = document.createElement('header');
            const title = new Title(this.#text);
            header.appendChild(title.main());
            return header;
        } catch (error) {
            console.error(error.message);
        }
    }
}