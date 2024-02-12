export class HamburgerX {
   createButton(id, onClick) {
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
    
    fatherNav.append(inputHamburger, label);
    label.append(spanHamburger, spanIconBar1, spanIconBar2, spanIconBar3);

    inputHamburger.addEventListener('click', onClick);

    return fatherNav;
  }
}