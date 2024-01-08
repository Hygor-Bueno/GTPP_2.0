export default class Containers {
    containerBasic(configs) {
        try {
            if(!configs || !configs.element) throw new Error('key element not found.');
            const container = document.createElement('div');
            if (configs && configs.id) container.id = configs.id;
            container.appendChild(configs.element);
            return container;
        } catch (error) {

        }
    }
}