/**
 * Váriável de configuração para componentes html;
 * @date 10/01/2024 - 5:27:19 PM
 * @author Hygor Bueno.
 * @type {{legend:string;listfields:[{classItemsForm:string;classForm:string;classLabel:string;classInput:string;label:string;inputType:string;inputId:string;requiredInput:boolean;iconLabel:boolean,nameImageLabel:string}]}}
 */
export const inputsLogin =
{
    legend: 'login',
    listfields:
        [
            {
                classItemsForm: 'itemsForm',
                classForm: 'form',
                classLabel: 'labelForm',
                classInput: 'inputForm',
                label: 'Usuário',
                inputType: 'text',
                inputId: 'userInput',
                iconLabel: true,
                nameImageLabel: 'User.svg'
            },
            {
                classItemsForm: 'itemsForm',
                classForm: 'form',
                classLabel: 'labelForm',
                classInput: 'inputForm',
                label: 'Senha',
                inputType: 'password',
                inputId: 'passwordInput',
                iconLabel: true,
                nameImageLabel: 'Lock.svg'
            }
        ]
};

/**
 * @date 2/5/2024 - 10:03:34 AM
 * @author Jonatas silva
 * @type {{ legend: string; listfields: [{classItemsForm:string;classForm:string;classLabel:string;classInput:string;label:string;inputType:string;inputId:string;iconLabel:boolean;nameImageLabel:string;}, {selectId:string;label:string;iconLabel:boolean;nameImageLabel:string;registerInputs:boolean;classLabel:string;name:string;classSelect:string;options:[{value:string;text:string;}]}]; }}
 */
export const registerInputs = {
    legend: 'register',
    listfields: [
        {
            classItemsForm: 'itemsForm',
            classForm: 'form',
            classLabel: 'labelForm',
            classInput: 'inputForm',
            label: 'Register',
            inputType: 'text',
            inputId: 'registerInput',
            iconLabel: true,
            nameImageLabel: 'pen1.svg'
        },
        {
            selectId: 'priority',
            label: 'Seleciona a prioridade',
            iconLabel: true,
            nameImageLabel: 'priority.svg',
            requiredInput: false,
            classLabel: 'labelForm',
            name: 'selectFieldName',
            classSelect: 'inputForm',
            options: [
                { value: '', text: 'Selecione' },
                { value: '2', text: 'alto' },
                { value: '1', text: 'medio' },
                { value: '0', text: 'baixo' },
            ],
            type: 'select'
        },
        {
            classItemsForm: 'itemsForm',
            classForm: 'form',
            classLabel: 'labelForm',
            classInput: 'inputForm',
            label: 'Data Inicial',
            inputType: 'date',
            inputId: 'initialDate',
            iconLabel: true,
            nameImageLabel: 'calendar.svg'
        },
        {
            classItemsForm: 'itemsForm',
            classForm: 'form',
            classLabel: 'labelForm',
            classInput: 'inputForm',
            label: 'Data Final',
            inputType: 'date',
            inputId: 'finalDate',
            iconLabel: true,
            nameImageLabel: 'calendar.svg'
        },
    ]
};

/**
 * 
 * @param {{legend:string;listfields:{classItemsForm:string;classForm:string;classLabel:string;classInput:string;label:string;inputType:string;inputId:string;iconLabel:boolean;nameImageLabel:string;};}}
 */
export const suspendedInput = {
    legend: 'register',
    listfields:{
        classItemsForm: 'itemsForm',
        classForm: 'form',
        classLabel: 'labelForm',
        classInput: 'inputForm',
        label: 'Quantos dias voce precisa para entregar a tarefa?',
        inputType: 'number',
        inputId: 'suspendedInput',
        iconLabel: true,
        nameImageLabel: 'pen1.svg'
    }
}

/**
 * Description placeholder
 * @date 2/15/2024 - 12:39:18 PM
 * @type {{inputType:string;inputId:string;classInput:string;placeholder:string;}}
 */
export const textInputName = {
    inputType: 'text',
    inputId: 'taskNameInput',
    classInput: 'custom-input-class',
    placeholder: 'Enter task name',
};

/**
 * Description placeholder
 * @date 2/15/2024 - 12:39:22 PM
 * @type {{inputType:string;inputId:string;classInput:string;}}
 */
export const dateInputConfig = {
    inputType: 'date',
    inputId: 'initialDateInput',
    classInput: 'custom-input-class'
};

/**
 * Description placeholder
 * @date 2/15/2024 - 12:39:26 PM
 * @type {{inputType:string;inputId:string;classInput:string;}}
 */
export const textInputPriority = {
    inputType: 'select',
    inputId: 'initialPriorityInput',
    classInput: 'custom-input-class'
}

/**
 * Váriável de configuração para componentes html;
 * @date 10/01/2024 - 5:26:34 PM
 * @author Hygor Bueno.
 * @type {{type:string;title:string;description:string;classButton:string;}} 
 */
export const buttonLogin = {
    type: 'button',
    title: 'Click para entrar',
    description: 'Login',
    classButton: 'bgButton'
}

/**
 * Váriável de configuração para componentes html;
 * @date 10/01/2024 - 5:29:24 PM
 * @author Hygor Bueno.
 * @type {{type:string;title:string;description:string;classButton:string;}}
 */
export const buttonCloseModal = {
    type: 'button',
    title: 'Click para entrar',
    description: 'x',
    classButton: 'btn-close'
}

/**
 * Váriável de configuração para componentes html;
 * @date 12/01/2024 - 4:35:09 PM
 * @author Hygor Bueno.
 * @type {{type:string;title:string;description:string;classButton:string;}}
 */
export const buttonMenu = {
    type: 'button',
    title: 'Fechar menu',
    description: '\u2630',
    classButton: 'menuButton'
}

/**
 * Váriável de configuração para componentes html;
 * @date 12/01/2024 - 4:42:21 PM
 * @author Hygor Bueno.
 * @type {{listItems:{label:string;icon:string;router:string};}}
 */
export const listItemsMenu = {
    listItems: [
        { label: 'Home', icon: 'House.svg', router: 'Home' },
        { label: 'Logoff', icon: 'Logout.svg', router: 'Login' }
    ],
}


/**
 * Description placeholder
 * @date 1/12/2024 - 11:44:29 AM
 * @author Jonatas Silva.
 * @type {{type:string;title:string;description:string;classButton:string;}}
 */
export const buttonPDF = {
    type: 'button',
    title: 'Criar um arquivo PDF',
    description: '',
    id: 'btnPDF',
    classButton: 'btn-submenu'
}

/**
 * Description placeholder
 * @date 1/12/2024 - 11:50:37 AM
 * @author Jonatas Silva.
 * @type {{type:string;title:string;description:string;classButton:string;}}
 */
export const buttonCSV = {
    type: 'button',
    title: 'Criar um arquivo CSV',
    description: '',
    classButton: 'btn-submenu'
}


/**
 * Description placeholder
 * @date 1/12/2024 - 11:52:24 AM
 * @author Jonatas Silva.
 * @type {{type:string;title:string;description:string;classButton:string;}}
 */
export const buttonAdd = {
    type: 'button',
    title: 'Clique para adicionar um item a lista!',
    description: '',
    classButton: 'btn-submenu'
}

/**
 * Description placeholder
 * @date 2/5/2024 - 10:02:44 AM
 * @author Jonatas Silva.
 * @type {{type:string;title:string;description:string;classButton:string;}}
 */
export const buttonToTask = {
    type: 'button',
    title: 'Clique para mover essa tarefa para fazendo!',
    description: 'Fazendo',
    classButton: 'btn-toTask'
}

/**
 * Description placeholder
 * @date 2/5/2024 - 10:02:53 AM
 * @author Jonatas Silva.
 * @type {{title:string;type:string;classButton:string;id:string;}}
 */
export const buttonStateTask = {
    title: 'Abrir lista de status',
    type: 'button',
    classButton: 'btn',
    id: 'buttoStateTask'
}

/**
 * Description placeholder
 * @date 2/5/2024 - 10:03:15 AM
 * @author Jonatas Silva.
 * @param {{type:string;title:string;description:string;classButton:string;}}
 */
export const saveButton = {
    type: 'submit',
    title: 'Clique para adicionar um item a lista',
    description: 'Salvar',
    classButton: 'btnSuccess',
}

/**
 * @date 2/5/2024 - 9:26:15 AM
 * @author Hygor Bueno
 * @param {{legend:string;listfields:[{classItemsForm:string;classForm:string;classLabel:string;classInput:string;label:string;inputType:string;inputId:string;requiredInput:boolean;iconLabel:boolean,nameImageLabel:string}]}}
 * @param {string} value
 * @param {()=>} onChange
 */
export const inputsEditText = (value,onChange) => {
    return {
        legend: 'Editar',
        listfields: {
            inputValue: value,
            classItemsForm: 'itemsForm',
            classForm: 'form',
            classLabel: 'labelForm',
            classInput: 'inputForm',
            label: 'Editar',
            inputType: 'text',
            iconLabel: true,
            nameImageLabel: 'Pen.svg',
            onChange:onChange
        }
    };
}

/**
 * @param {{inputId:string;inputType:string;checked:boolean;onClick:()=>;}}
 * @param {number} id
 * @param {()=>} onClick
 */
export const inputHamburgerModal = (id, onClick) => {
    return {
        inputId:`dropdown_${id}`,
        inputType: 'checkbox',
        checked:false,
        onClick:onClick
    }
}

/** 
 * @param {{classLabel:string;description:string;for:string;}} 
 * @param {number} id
 * */
export const inputLabelHamburgerModal = (id) => {
    return {
        classLabel: 'dropdown',
        for: `dropdown_${id}`, 
        description: ''
    }
}
/**
 * Váriável de configuração para componentes html;
 * @date 05/02/2024 - 10:05 PM
 * @author Hygor Bueno.
 * @type {{type:string;title:string;description:string;classButton:string;}} 
*/
export const buttonEditText = {
    type: 'button',
    title: 'Click para salvar alteração',
    description: 'Salvar',
    classButton: 'bgButton'
}