/**
 * Classe Translato
 * @date 10/01/2024 - 5:42:48 PM
 * @author Hygor Bueno.
 * @export
 * @class Translator
 * @classdesc Classe destinada a tradução dos erros vindo do banco de dados para.
 */
export default class Translator {
    #messagePT = '';

    /**
     * Este método recebe uma mensagem em vinda do servidor e traduz ela.
     * @date 10/01/2024 - 5:45:16 PM
     * @author Hygor Bueno.
     * @constructor
     * @param {string} messagePT
     */
    constructor(messagePT) {

        switch (this.validation(messagePT)) {
            case 'IS BROKEN':
                this.#messagePT = 'ERRO 400 - Certifique-se de que todos os campos foram preenchidos corretamente.';
                break;
            case 'This method is not allowed':
                this.#messagePT = 'ERRO 405 - Não foi possível executar os métodos.';
                break;
            case 'NO DATA':
                this.#messagePT = 'Falha ao realizar a ação, dados não encontrados.';
                break;
            case 'Default password is not permited':
                this.#messagePT = 'Você será redirecionado para a página de alteração de senha.';
                break;
            case 'This password do is not match':
                this.#messagePT = 'Senha incorreta!';
                break;
            case 'SUCCESS':
                this.#messagePT = 'Ação realizada com sucesso.';
                break;
            case 'Value already exists':
                this.#messagePT = 'Falha! Item já foi cadastrado.';
                break;
            case 'Authorization denied':
                this.#messagePT = 'Autorização negada. Realize o login novamente.'
                break;
            case 'FOREIGN':
                this.#messagePT = 'Erro de chave estrangeira.'
                break;
            default:
                this.#messagePT = messagePT;
                break;
        }
    }

    /**
     * Método acesor da classe (GET)
     * @date 10/01/2024 - 5:47:03 PM
     * @author Hygor Bueno.
     * @returns {string}
     */
    getMessagePT() {
        return this.#messagePT;
    }
    /**
     * Método modificador da classe (SET)
     * @date 10/01/2024 - 5:47:03 PM
     * @author Hygor Bueno.
     * @returns {string}
     */
    setMessagePT(messagePT) {
        this.#messagePT = messagePT;
    }

    /**
     * Este método verifica a mensagem recebida e simplificar em grupos para retornos padrão, caso a mensagem não se enquadre em nenhum dos grupos ela é retornada na intergra.
     * @date 10/01/2024 - 5:59:30 PM
     * @author Hygor Bueno.
     * @param {string} messagePT
     * @returns {string}
     */
    validation(messagePT) {
        let result = '';
        if (messagePT.toUpperCase().includes('IS BROKEN')) {
            result = 'IS BROKEN';
        } else if (messagePT.toUpperCase().includes('NO DATA')) {
            result = 'NO DATA';
        } else if (messagePT.toUpperCase().includes('SUCCESS')) {
            result = 'SUCCESS';
        } else if (messagePT.toUpperCase().includes('FOREIGN')) {
            result = 'FOREIGN';
        } else {
            result = messagePT;
        }
        return result;
    }

}
