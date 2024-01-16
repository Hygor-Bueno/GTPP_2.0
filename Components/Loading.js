import Containers from "./Containers.js";
import Title from "./Title.js";

export default class Loading{
    #title;
    constructor(title){
        this.#title = title || 'Loading...';
    }
    createModal(){
        const container = new Containers();
        const title = new Title(this.#title);
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        const elementContainer = container.containerBasic({element:spinner});
        elementContainer.appendChild(title.main());
        elementContainer.id = 'containerModal';
        return elementContainer;
    }
    open(){
        const  spinner =document.getElementById('containerModal');
        if(!spinner){
            document.querySelector('body').appendChild(this.createModal());
        }
    }
    close(){
        const  spinner =document.getElementById('containerModal');
        if(spinner){
            spinner.remove();
        }
    }
}