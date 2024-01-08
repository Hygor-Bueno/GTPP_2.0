export const inputsLogin = [
    {
        legend: 'login',
        listfields: [
            {
                classItemsForm: 'itemsForm',
                classForm: 'form',
                classLabel: 'labelForm',
                classInput: 'inputForm',
                label: 'Usuário:',
                inputType: 'text',
                inputId:'userInput'
            },
            {
                classItemsForm: 'itemsForm',
                classForm: 'form',
                classLabel: 'labelForm',
                classInput: 'inputForm',
                label: 'Senha:',
                inputType: 'password',
                inputId:'passwordInput'
            }
        ]
    }
];

export const buttonLogin = {
    type: 'button',
    title: 'Click para entrar',
    description: 'Login',
    classButton: 'bgButton'
}