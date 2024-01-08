export default class Util {
    ValidatKeysComponent(listKeys,  object) {
        let result = true;
        listKeys.forEach(itemKey => {
            let subResult = listKeys.includes(...Object.keys(object))
            if (!subResult || !object[itemKey]) result = false;
        });
        return result;
    }
    cleanInputs(local){
        let list = document.querySelectorAll(local);
        list.forEach(item=>item.value='');   
    }
}
