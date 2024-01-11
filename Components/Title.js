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
    constructor(title){
        this.#title = title;
    }
    main(){
        const h1 = document.createElement('h1');
        h1.innerText = this.#title;
        h1.className = 'mainTitle';
        return h1;
    }
}