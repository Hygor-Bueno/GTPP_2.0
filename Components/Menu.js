import List from "./List.js";

export default class Menu {
    nav() {
        const list = new List({
            listItems: [
                { label: 'Home' },
                { label: 'Logoff' }
            ]
        });

        const nav = document.createElement('nav');

        nav.appendChild(list.ul());
        return nav;
    }
}