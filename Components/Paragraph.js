/**
 * Description placeholder
 * @date 1/11/2024 - 1:49:28 PM
 *
 * @export
 * @description compoenente que podemos fazer a description 
 * @class Paragraph
 */
export default class Paragraph {
    #title;
    #class;
    constructor(title) {
        this.#title = title;
    }
    simpleParagraph() {
        const p = document.createElement('p');
        p.innerText = this.#title;
        p.className = this.#class || 'simpleParagraph';
        return p;
    }

}