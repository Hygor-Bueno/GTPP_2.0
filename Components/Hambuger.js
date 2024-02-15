// export class HamburgerX {
//     createButton(id, onClick) {
//         try {
//             const fatherNav = document.createElement('nav');
//             fatherNav.className = 'fatherNav';
//             const elements = [];
//             const inputHamburger = document.createElement('input');
//             inputHamburger.id = `dropdown_${id}`;
//             inputHamburger.className = 'input-box';
//             inputHamburger.style.display = "none";
//             inputHamburger.type = 'checkbox';
//             inputHamburger.checked = false;
//             elements.push(inputHamburger);
//             const label = document.createElement('label');
//             label.setAttribute("for", `dropdown_${id}`);
//             label.className = 'dropdown';
//             const classNames = ['hamburger', 'icon-bar top-bar', 'icon-bar middle-bar', 'icon-bar bottom-bar'];
//             classNames.forEach(className => {
//                 const element = document.createElement('span');
//                 element.className = className;
//                 label.appendChild(element);
//             });
//             elements.push(label);
//             fatherNav.append(...elements);
//             inputHamburger.addEventListener('click', onClick);
//             return fatherNav;
//         } catch (error) {
//             console.error(error.message);
//         }
//     }    
// }

export class HamburgerX {
    createButton(id, onClick) {
        try {
            const fatherNav = document.createElement('nav');
            fatherNav.className = 'fatherNav';
            const elements = [];
            const inputHamburger = document.createElement('input');
            inputHamburger.id = `dropdown_${id}`;
            inputHamburger.className = 'input-box';
            inputHamburger.style.display = "none";
            inputHamburger.type = 'checkbox';
            inputHamburger.checked = false;
            elements.push(inputHamburger);
            const label = document.createElement('label');
            label.setAttribute("for", `dropdown_${id}`);
            label.className = 'dropdown';
            const classNames = ['hamburger', 'icon-bar top-bar', 'icon-bar middle-bar', 'icon-bar bottom-bar'];
            classNames.forEach(className => {
                const element = document.createElement('span');
                element.className = className;
                label.appendChild(element);
            });
            elements.push(label);
            fatherNav.append(...elements);
            inputHamburger.addEventListener('click', onClick);
            return fatherNav;
        } catch (error) {
            console.error(error.message);
        }
    }    
}