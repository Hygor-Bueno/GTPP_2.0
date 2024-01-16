import Util from "../Util";

/**
 * Description placeholder
 * @date 1/15/2024 - 4:18:41 PM
 *
 * @export
 * @class Input
 * @author Jonatas Silva.
 * @param {Object} config
 * @return {HTMLInputElement}
 */
export default class Input {
    Util = new Util();

    Input(config) {
        try {
            let mandatory = ['type', 'onChange', 'value'];
            let result = this.Util.ValidatKeysComponent(mandatory, config);
            if(!result) throw new Error(`is broken (${mandatory})`);

            const input = document.createElement('input');
            input.type = config.type;
            input.onchange = config.onChange;
            input.value = config.value;
            input?.placeholder = config.placeholder;
            input?.title = config.title;

            if(config?.id) input.id = config.id;
            if(config && config.classInput) input.className = config.classInput;
            return input;

        } catch (e) {
            console.error(e.errorMessage);
        }
    }
}