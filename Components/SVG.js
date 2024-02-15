/**
 * Class representing an SVG utility for creating SVG elements dynamically.
 */
export default class SVG {
    /**
     * Creates an SVG element based on the provided configuration.
     * @param {Object} config - Configuration object for the SVG element.
     * @param {number} config.height - Height of the SVG element.
     * @param {string} config.viewBox - ViewBox attribute of the SVG element.
     * @param {number} config.width - Width of the SVG element.
     * @param {string} config.fill - Fill color of the SVG element.
     * @param {string} [config.title] - Optional title attribute for the SVG element.
     * @param {string} config.path - Path attribute of the SVG element.
     * @returns {SVGElement} - The created SVG element.
     */
    createSvg(config) {
        // Create a new SVG element
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        // Set attributes for the SVG element
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("height", config.height);
        svg.setAttribute("viewBox", config.viewBox);
        svg.setAttribute("width", config.width);
        svg.setAttribute("fill", config.fill);
        if(config.title) svg.setAttribute("title", config.title);

        // Create a path element within the SVG
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", config.path);

        // Append the path element to the SVG
        svg.appendChild(path);

        // Return the created SVG element
        return svg;
    }
}
