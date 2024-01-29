/**
 * Váriável de configuração para componentes html;
 * @date 10/01/2024 - 5:27:19 PM
 * @author Hygor Bueno.
 * @type {{legend:string; listfields:[{ classItemsForm: string; classForm: string; classLabel: string; classInput: string; label: string; inputType: string; inputId: string;requiredInput:boolean;iconLabel:boolean,nameImageLabel:string }]}}
 */
export const inputsLogin = [
    {
        legend: 'login',
        listfields: [
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
    }
];

export const registerInputs = [
    {
        legend: 'register',
        listfields: [
            {
                classItemsForm: 'itemsForm',
                classForm: 'form',
                classLabel: 'labelForm',
                classInput: 'inputForm',
                label: 'Register',
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
                label: 'Data Inicial',
                inputType: 'date',
                inputId: 'passwordInput',
                iconLabel: true,
                nameImageLabel: 'Lock.svg'
            }
        ]
    }
];

export const textInputName = {
    inputType: 'text',
    inputId: 'taskNameInput',
    classInput: 'custom-input-class'
};

export const dateInputConfig = {
    inputType: 'date',
    inputId: 'initialDateInput',
    classInput: 'custom-input-class'
};

export const textInputPriority = {
    inputType: 'select',
    inputId: 'initialPriorityInput',
    classInput: 'custom-input-class'
}

/**
 * Váriável de configuração para componentes html;
 * @date 10/01/2024 - 5:26:34 PM
 * @author Hygor Bueno.
 * @type {{ type: string; title: string; description: string; classButton: string; }} 
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
 * @type {{ type: string; title: string; description: string; classButton: string; }}
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
 * @type {{ type: string; title: string; description: string; classButton: string; }}
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
 * @type {{ listItems: {label:string;icon:string;router:string}; }}
 */
export const listItemsMenu = {
    listItems: [
        { label: 'Home', icon: 'House.svg', router:'Home' },
        { label: 'Logoff', icon: 'Logout.svg',router:'Login' }
    ],
}


/**
 * Description placeholder
 * @date 1/12/2024 - 11:44:29 AM
 * @author Jonatas Silva.
 * @type {{ type: string; title: string; description: string; classButton: string; }}
 */
export const buttonPDF={
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
 * @type {{ type: string; title: string; description: string; classButton: string; }}
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
 * @type {{ type: string; title: string; description: string; classButton: string; }}
 */
export const buttonAdd = {
    type: 'button',
    title: 'Clique para adicionar um item a lista!',
    description: '',
    classButton: 'btn-submenu'
}

export const buttonToTask = {
    type: 'button',
    title: 'Clique para mover essa tarefa para fazendo!',
    description: 'Fazendo',
    classButton: 'btn-toTask'
}

export const buttonStateTask ={
    title: 'Abrir lista de status', 
    type: 'button', 
    classButton: 'btn',
    id: 'buttoStateTask'
}

