/**
 * Description placeholder
 * @date 1/26/2024 - 4:51:52 PM
 * @description Componente hamburger
 * @export
 * @class Hamburger
 * @typedef {Hamburger}
 */
export class Hamburger {
    constructor(openFunction, closeFunction) {
      this.openFunction = openFunction;
      this.closeFunction = closeFunction;
    }
  
    createButtonHamburger(id) {
      const fatherNav = document.createElement('nav');
      fatherNav.className = 'fatherNav';
  
      const inputHamburger = document.createElement('input');
      inputHamburger.id = `dropdown_${id}`;
      inputHamburger.className = 'input-box';
      inputHamburger.style = "display: none;";
      inputHamburger.type = 'checkbox';
      inputHamburger.checked = false;
  
      const label = document.createElement('label');
      label.setAttribute("for", `dropdown_${id}`);
      label.className = 'dropdown';
  
      const spanHamburger = document.createElement('span');
      spanHamburger.className = 'hamburger';
  
      const spanIconBar1 = document.createElement('span');
      spanIconBar1.className = 'icon-bar top-bar';
  
      const spanIconBar2 = document.createElement('span');
      spanIconBar2.className = 'icon-bar middle-bar';
  
      const spanIconBar3 = document.createElement('span');
      spanIconBar3.className = 'icon-bar bottom-bar';
  
      fatherNav.appendChild(inputHamburger);
      fatherNav.appendChild(label);
  
      label.appendChild(spanHamburger);
      label.appendChild(spanIconBar1);
      label.appendChild(spanIconBar2);
      label.appendChild(spanIconBar3);
  
      inputHamburger.addEventListener('click', (e) => {
        const cardReturn = document.getElementById(id);
        e.target.checked ? this.openFunction(cardReturn, id) : this.closeFunction(id);
      });
  
      return fatherNav;
    }
  }
  