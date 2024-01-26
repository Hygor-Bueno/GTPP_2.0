/**
 * Classe destinada a funções utilitárias que serão utilizadas para todo o código.
 * @date 1/11/2024 - 9:29:28 AM
 * @author Hygor Bueno
 * @export
 * @class Util
 */
export default class Util {
    /**
     * Esse método é responsável por validar as chaves obrigatórias do componente.
     * @date 1/11/2024 - 9:30:14 AM
     *
     * @param {[]} listKeys
     * @param {object} object
     * @returns {boolean}
     */
    ValidatKeysComponent(listKeys,  object) {
        let result = true;
        listKeys.forEach(itemKey => {
            let subResult = listKeys.includes(...Object.keys(object))
            if (!subResult || !object[itemKey]) result = false;
        });
        return result;
    }
    /**
     * Limpa todos os inputs de um determinado elemento.
     * @date 1/11/2024 - 9:31:48 AM
     *
     * @param {string} local
     */
    cleanInputs(local){
        let list = document.querySelectorAll(local);
        list.forEach(item=>item.value='');   
    }

    validateMandatoryFields(){
        const elementList = document.querySelectorAll('[data-required="1"]');
        elementList.forEach(element=>{
            if(!element.value) element.classList.add('borderDanger');
        })
    }

    removeStringAndUnderline(value) {
      const result = value.replace(/[^0-9]/g,'');
      return result;
    }

    removeElementClikAway(element, id){
        element.addEventListener('click', function (event) {
            if (event.target.id === id) {
              element.remove();
            }
          });
    }
}
