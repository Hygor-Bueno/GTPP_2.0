import Containers from "./Containers.js";
import Title from "./Title.js";

export default class Footer{
    #title;
    #creators;
    constructor(title,creators){
        this.#creators = creators;
        this.#title = title;
    }

    main(){
        try {
            const containerLeft = new Containers();
            const containerRight = new Containers();
            const footer = document.createElement('footer');
            const lblTitle = document.createElement('label');
            const lblCreators = document.createElement('label');
            lblTitle.innerText = this.#title;
            lblCreators.innerText = this.#creators;
            const elementLeft = containerLeft.containerBasic({element:lblTitle});
            elementLeft.id = 'footerDivLeft';
            const elementRigth = containerRight.containerBasic({element:lblCreators});
            elementRigth.id = 'footerDivRigth';
            footer.append(elementLeft, elementRigth);
            return footer;
        } catch (error) {
            console.error(error.message);
        }
    }
}