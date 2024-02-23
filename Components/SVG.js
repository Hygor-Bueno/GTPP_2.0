/**
 * Classe que representa uma utilidade SVG para criar elementos SVG dinamicamente.
 */
export default class SVG {
    /**
     * Cria um elemento SVG com base na configuração fornecida.
     * @param {Object} config Objeto de configuração para o elemento SVG.
     * @param {number} config.height Altura do elemento SVG.
     * @param {string} config.viewBox Atributo viewBox do elemento SVG.
     * @param {number} config.width Largura do elemento SVG.
     * @param {string} config.fill Cor de preenchimento do elemento SVG.
     * @param {string} [config.title] Atributo de título opcional para o elemento SVG.
     * @param {string} config.path Atributo de caminho do elemento SVG.
     * @returns {SVGElement} O elemento SVG criado.
     */
    createSvg(config) {
        // Cria um novo elemento SVG
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        // Define atributos para o elemento SVG
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("height", config.height);
        svg.setAttribute("viewBox", config.viewBox);
        svg.setAttribute("width", config.width);
        svg.setAttribute("fill", config.fill);
        if(config.title) svg.setAttribute("title", config.title);

        // Cria um elemento de caminho dentro do SVG
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", config.path);

        // Anexa o elemento de caminho ao SVG
        svg.appendChild(path);

        // Retorna o elemento SVG criado
        return svg;
    }
}
