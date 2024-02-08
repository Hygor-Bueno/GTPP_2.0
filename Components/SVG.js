export default class SVG {
    createSvg(config) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("height", config.height);
        svg.setAttribute("viewBox", config.viewBox);
        svg.setAttribute("width", config.width);
        svg.setAttribute("fill", config.fill);
        if(config.title) svg.setAttribute("title", config.title);
    
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", config.path);
    
        svg.appendChild(path);
    
        return svg;
    }
}
