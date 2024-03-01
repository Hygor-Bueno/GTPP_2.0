/**
 * Classe que representa uma utilidade SVG para criar elementos SVG dinamicamente.
 */

export default class SVG {
    #W3C = "http://www.w3.org/2000/svg";
    #height;
    #viewBox;
    #width;
    #fill;
    #path;
    #title;

    /**
     * valores vindo do arquivo de Imagens SVG
     * @date 2/29/2024 - 3:15:44 PM
     * @param {{height:string;viewBox:string;width:string;fill:string;path:string;title:string}} config;
     * 
     * @constructor
     * @param {string[]} config
     */
    constructor(config) {
        this.#height=config.height;
        this.#viewBox=config.viewBox;
        this.#width=config.width;
        this.#fill=config.fill;
        this.#path=config.path;
        this.#title=config.title;
    }

    /**
     * Metodo que faz a criação do SVG
     * @date 2/29/2024 - 3:15:44 PM
     *
     * @returns {SVGElement}
     */
    createSvg() {
        const svg = document.createElementNS(this.#W3C, "svg");
        this.#Atrr(svg);
        if(this.#title) svg.setAttribute("title", this.#title);
        const path = document.createElementNS(this.#W3C, "path");
        path.setAttribute("d", this.#path);
        svg.appendChild(path);
        return svg;
    }

    /**
     * Colocando as propridades obrigatorias para criação de um SVG
     * @date 2/29/2024 - 3:15:44 PM
     *
     * @param {SVGElement} local
     */ 
    #Atrr(local) {
        local.setAttribute("xmlns", this.#W3C);
        local.setAttribute("height", this.#height);
        local.setAttribute("viewBox", this.#viewBox);
        local.setAttribute("width", this.#width);
        local.setAttribute("fill", this.#fill);
    }

}
