/**
 * Description placeholder
 * @date 1/11/2024 - 11:27:17 AM
 *
 * @export
 * @class Card
 */
export default class Card {
    constructor(title, description, buttons) {        
        this.title = title;
        this.description = description;
        this.buttons = buttons || [];
        this.render();
    }

    render() {
        const cardContainer = document.getElementById('app');

        const card = document.createElement("div");
        card.classList.add('card');

        const titleElement = document.createElement("div");
        titleElement.classList.add('card-title');
        titleElement.textContent = this.title;
        card.appendChild(titleElement);

        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('card-description');
        descriptionElement.textContent = this.description;
        card.appendChild(descriptionElement);


        if (this.buttons.length > 0) {
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('card-buttons');

            this.buttons.forEach((buttonInfo) => {
                const button = document.createElement('button');
                button.classList.add('card-button');
                button.textContent = buttonInfo.text;
                button.addEventListener('click', buttonInfo.onClick);
                buttonContainer.appendChild(button);
            });

            card.appendChild(buttonContainer);
        }

        cardContainer.appendChild(card);
    }
}