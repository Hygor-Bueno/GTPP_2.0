export default class Containers{
    containerBasic(configs){
        const container = document.createElement('div');
        if(configs.id) container.id = configs.id;
        container.innerText ='Hellow';
        return container;
    }
}