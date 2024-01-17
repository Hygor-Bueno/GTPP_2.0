/**
 * Classe Containers.
 * @date 10/01/2024 - 4:49:44 PM
 * @author Hygor Bueno.
 * @export
 * @class Containers
 * @classdesc Um componente de containers criado para agilizar e padronizar os componentes da página.
 */
export default class Containers {
    /**
     * Cria e retonar um elemento html que serve como um container para os demais elementos. A tag retornada é uma div.
     * @date 10/01/2024 - 4:50:51 PM
     * @author Hygor Bueno.
     * @param {{id?:string;class?:string;element:HTMLElement}} configs
     * @returns {HTMLElement} container
     * 
     */
    containerBasic(configs) {
        try {
            if(!configs || !configs.element) throw new Error('key element not found.');
            const container = document.createElement('div');
            if (configs && configs.id) container.id = configs.id;
            if (configs && configs.class) container.className = configs.class;
            
            container.appendChild(configs.element);
            return container;
        } catch (error) {
            console.error(error);
        }
    }
}