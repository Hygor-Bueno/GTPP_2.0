import { inputHamburgerModal, inputLabelHamburgerModal } from "../Configuration/Configuration.js";
import Form from "./Form.js";

/**
 * @date 2/15/2024 - 9:48:38
 * @class HamburgerX
 * @author Jonatas Silva
 */
export class HamburgerX {
    
    /**
     * @description Retorna um elemento do tipo botão em formato de "X" quando é clicado!
     * @param {number} id
     * @param {()=>void} onClick
     * @returns {HTMLButtonElement} Button
     */
    createButton(id, onClick) {
        try {
            const fatherNav = document.createElement('nav');
            fatherNav.className = 'fatherNav';
            const elements = [];
            const inputHamburger = new Form().input(inputHamburgerModal(id, onClick));
            elements.push(inputHamburger);
            const label = new Form().simpleLabel(inputLabelHamburgerModal(id));
            const classNames = ['hamburger', 'icon-bar top-bar', 'icon-bar middle-bar', 'icon-bar bottom-bar'];
            classNames.forEach(className => {
                const element = document.createElement('span'); element.className = className; label.appendChild(element);
            });
            elements.push(label);
            fatherNav.append(...elements);
            return fatherNav;
        } catch (error) {
            console.error(error.message);
        }
    }    
}