/**
 * @date 1/11/2024
 *
 * @export
 * @class TitleCard
 * @type TitleCard
 * @description é um componente de titulo
 */
export default class Title {
    #title;
    #classTitle;
    constructor(title, classTitle){

        this.#title = title;
        this.#classTitle = classTitle;
    }
    main(){
        const h1 = document.createElement('h1');
        h1.innerText = this.#title;
        h1.className = this.#classTitle ? this.#classTitle : 'mainTitle';
        return h1;
    }
}