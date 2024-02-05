
import Loading from "../Components/Loading.js";
import Modal from "../Components/Modal.js";
import Translator from "./Translator.js";

/**
 * Description placeholder
 * @date 11/01/2023 - 8:02:54 AM
 * @author Hygor Bueno.
 *
 * @export
 * @class Connection
 * @classdesc Classe reponsável pelas interações com o banco de dados. Ela consistem em uma estrutura que permite realizar GET,PUT,POST e DELETE. Elas também é reposável pela a aparição do Modal para o usuário caso a requisição falhe de alguma forma.
 */
export class Connection {
    URL;
    params;
    pathFile;
    err = {
        error: true,
        exception: ''
    };
    load = new Loading();

    /**
     * Método GET - realiza a busca de informações no servidor.
     * @date 11/01/2023 - 8:07:59 AM
     * @author Hygor Bueno.
     * 
     * @async async
     * @param {string} params
     * @param {string} pathFile
     * @param {{error:boolean;exception:string}} err
     * @returns {{error:boolean;data:Object}}
     */
    async get(params, pathFile, err) {
        this.load.open();
        this.validationParams(params, pathFile, err);
        await this.settingUrl(`/Controller/${this.pathFile}?app_id=3&AUTH=`, params)
        let req;
        await fetch(this.URL, {
            method: 'GET',
        }).then(response => response.json())
            .then(body => {
                if (body.error) throw new Error(body.message)
                req = body;
            }).catch(messageErr => {
                req = this.prepareCatchReturn(messageErr);
            })
        this.cleanParams();
        this.load.close();
        return req;
    }

    /**
     * Método POST - realiza a inserção de uma informações no servidor.
     * @date 11/01/2023 - 8:07:59 AM
     * @author Hygor Bueno.
     * 
     * @async
     * @param {object} params
     * @param {string} pathFile
     * @param {{error:boolean;exception:string}} err
     * @returns {{error:boolean;data:object}}
     */
    async post(params, pathFile, err) {
        this.load.open();
        this.validationParams(params, pathFile, err);
        await this.settingUrl(`/Controller/${this.pathFile}?app_id=3&AUTH=`)
        let req;
        await fetch(this.URL, {
            method: 'POST',
            body: JSON.stringify(this.params)
        }).then(response => response.json())
            .then(body => {
                if (body.error) throw Error(body.message);
                req = body;
            }).catch(messageErr => {
                req = this.prepareCatchReturn(messageErr);
            })
        this.cleanParams();
        this.load.close();
        return req;
    }

    /**
     * Método POST - realiza a inserção de uma informações no servidor (usada exclusivamente para realizar o Login). 
     * @date 11/01/2023 - 8:07:59 AM
     * @author Hygor Bueno.
     * 
     * @async
     * @param {object} params
     * @param {string} pathFile
     * @param {{error:boolean;exception:string}} err
     * @returns {{error:boolean;data:Object}}
     */
    async postLogin(params, pathFile, err) {
        this.load.open();
        this.validationParams(params, pathFile, err);
        await this.settingUrl(`/Controller/${this.pathFile}?app_id=3&login=&AUTH=`)
        let req;
        await fetch(this.URL, {
            method: 'POST',
            body: JSON.stringify(this.params)
        }).then(response => response.json())
        .then(body => {
            if (body.error) throw Error(body.message);
            req = body;
        }).catch(messageErr => {
            req = this.prepareCatchReturn(messageErr);
        })
        this.cleanParams();
        this.load.close();
        return req;
    }
    
    /**
     * Método PUT - realiza a alteração de uma informações no servidor. 
     * @date 11/01/2023 - 8:07:59 AM
     * @author Hygor Bueno.
     * 
     * @async
     * @param {object} params
     * @param {string} pathFile
     * @param {{error:boolean;exception:string}} err
     * @returns {{error:boolean;data:Object}}
     */
    async put(params, pathFile, err) {
        this.load.open();
        this.validationParams(params, pathFile, err);
        await this.settingUrl(`/Controller/${this.pathFile}?app_id=3&AUTH=`)
        let req;
        await fetch(this.URL, {
            method: 'PUT',
            body: JSON.stringify(this.params)
        }).then(response => response.json())
            .then(body => {
                if (body.error) throw Error(body.message)
                req = body;
            }).catch(messageErr => {
                req = this.prepareCatchReturn(messageErr);
            })
        this.cleanParams();
        this.load.close();
        return req;
    }
    /**
     * Método POST - realiza a inserção de uma informações no servidor (usada exclusivamente para realizar o reset de senha). 
     * @date 11/01/2023 - 8:07:59 AM
     * @author Hygor Bueno.
     * 
     * @async
     * @param {object} params
     * @param {string} pathFile
     * @param {{error:boolean;exception:string}} err
     * @returns {{error:boolean;data:Object}}
     */
    async putDefaltPassw(params, pathFile, err) {
        this.validationParams(params, pathFile, err);
        await this.settingUrl(`/Controller/${this.pathFile}?app_id=3&login=&AUTH=`)
        let req;
        await fetch(this.URL, {
            method: 'PUT',
            body: JSON.stringify(this.params)
        }).then(response => response.json())
            .then(body => {
                if (body.error) throw Error(body.message)
                req = body;
            }).catch(messageErr => {
                req = this.prepareCatchReturn(messageErr);
            })
        this.cleanParams();
        return req;
    }

    /**
     * Método DELETE - solicita a exclusão de uma informações através do servidor. 
     * @date 11/01/2023 - 8:07:59 AM
     * @author Hygor Bueno.
     * 
     * @async
     * @param {object} params
     * @param {string} pathFile
     * @param {{error:boolean;exception:string}} err
     * @returns {{error:boolean;data:Object}}
     */
    async delete(params, pathFile, err) {
        this.validationParams(params, pathFile, err);
        await this.settingUrl(`/Controller/${this.pathFile}?app_id=3&AUTH=`);
        let req;
        await fetch(this.URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Max-Age": "86400"
            },
            body: JSON.stringify(this.params)
        }).then((response) => response.json())
            .then((body) => {
                if (body.error) throw Error(body.message);
                req = body;
            }).catch((messageErr) => {
                req = this.prepareCatchReturn(messageErr,1);
            });
        this.cleanParams();
        return req;
    }
    /**
     * Método responsável por validar a existência dos parâmetros vincular a uma variável.
     * @date 11/01/2023 - 8:22:27 AM
     * @author Hygor Bueno.
     * @param {object} params
     * @param {string} pathFile
     * @param {{error:boolean;exception:string}} err
     */
    validationParams(params, pathFile, err) {
        if (params) this.params = params;
        if (pathFile) this.pathFile = pathFile;
        if (err) this.err = err;
    }

    /**
     * Método respomsável por limpar as varáveis.
     * @date 11/01/2023 - 8:24:31 AM
     */
    cleanParams() {
        this.params = "";
        this.pathFile = "";
        this.err = "";
    }
    /**
     * Método responsável por construir uma URL válida.
     * @date 11/01/2023 - 8:24:53 AM
     * @author Hygor Bueno.
     * @param {string} middlewer
     * @param {string} params
     */
    async settingUrl(middlewer, params) {
        let server = "http://192.168.0.99:71/GLOBAL";
        let token = localStorage.getItem('tokenGTPP');
        this.URL = server + middlewer + token + (params ? params : "");
    }

    /**
     * Ela recebe a mensagem de erro, valida se existe alguma exceção, caso tudo se encontre nos conformes ele abre o modal e retorna o resultado para o usuário. 
     * @date 11/01/2023 - 8:29:47 AM
     * @author Hygor Bueno.
     * @param {string} messageErr
     * @returns {{ error: boolean; message: string; }}
     */
    prepareCatchReturn(messageErr) {
        if (this.err.error && (!this.err.exception || !messageErr.message.toUpperCase().includes(this.err.exception.toUpperCase()))) {
            const translator = new Translator(messageErr["message"]);
            const modal = new Modal();
            modal.openModal('Erro!', translator.getMessagePT(), document.querySelector("#containerMain section"), 0);
        }
        return { "error": true, "message": messageErr["message"] }
    }
}