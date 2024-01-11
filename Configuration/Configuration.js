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
                inputId:'userInput',
                iconLabel:true,
                nameImageLabel:'User.svg'
            },
            {
                classItemsForm: 'itemsForm',
                classForm: 'form',
                classLabel: 'labelForm',
                classInput: 'inputForm',
                label: 'Senha',
                inputType: 'password',
                inputId:'passwordInput',
                iconLabel:true,
                nameImageLabel:'Lock.svg'
            }
        ]
    }
];

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