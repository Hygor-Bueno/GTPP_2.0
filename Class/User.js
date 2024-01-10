import { Connection } from "../Connection/Connection.js";
/**
 * Classe de usuários
 * @date 10/01/2024 - 4:15:56 PM
 * @author Hygor Bueno
 * @class User
 * @classdesc Utiliza os principios da programação orientada a objeto para criar um objeto usuário.
 * 
 */
export default class User {
    #connection = new Connection();
    id;
    token;
    name;
    company;
    shop;
    departament;
    sub;
    CSDS;
    photo;
    administrator;
    youContact = 0;
    pendingMessage = 0;
    notification = 0;

    /**
     * Método construtor da classe.carrega a foto do usuário.
     * @date 10/01/2024 - 4:23:49 PM
     * @author Hygor Bueno
     * @constructor
     * @param {number} id
     * @param {string} token
     * @param {Object} dataUser
     */
    constructor(id, token, dataUser) {
        this.id = id;
        this.token = token;
        dataUser && this.populate(dataUser);
    }

    /**
     * Método destinado a popular as váriáveis do objeto "User"carrega a foto do usuário.
     * @date 10/01/2024 - 4:29:03 PM
     * @author Hygor Bueno
     * @param {Object} dataUser
     */
    populate(dataUser) {
        this.id = dataUser.id;
        this.name = dataUser.name;
        this.company = dataUser.company;
        this.shop = dataUser.shop;
        this.departament = dataUser.departament;
        this.sub = dataUser.sub;
        this.CSDS = dataUser.CSDS;
        this.photo = dataUser.photo;
        this.administrator = dataUser.administrator;
        this.youContact = dataUser.youContact;
        this.pendingMessage = dataUser.pendingMessage;
        this.notification = dataUser.notification;
    }

    /**
     * Method que busca no banco as informações detalhadas do usuário e a photo de perfil dele.
     * @date 10/01/2024 - 4:31:48 PM
     * @author Hygor Bueno
     * @async
     */
    async loadInfo() {
        await this.loadPhotos();
        await this.loadDetails();
    }

    /**
     * Método que carrega a foto do usuário.
     * @date 10/01/2024 - 4:34:53 PM
     * @author Hygor Bueno
     * @async
     * @returns {*}
     */
    async loadPhotos() {
        try {
            let userPhoto = await this.#connection.get(`&id=${this.id}`, 'CCPP/EmployeePhoto.php');
            if (userPhoto.error && !userPhoto.message.includes('No data')) {
                throw new Error(userPhoto.message);
            } else if (!userPhoto.message) {
                this.photo = userPhoto.photo;
            }
        } catch (error) {
            console.log(error.toString());
        }
    }

    /**
     * Carrega as informações detalhada do colaborador (companhia, unidade, departamento, subdepartamento e etc)
     * @date 10/01/2024 - 4:37:49 PM
     * @author Hygor Bueno
     * @async
     * @returns {*}
     */
    async loadDetails() {
        try {
            let details = await this.#connection.get(`&id=${this.id}`, 'CCPP/Employee.php');
            if (details.error && !details.message.includes('No data')) throw new Error(details.message);
            this.name = details.data[0]["name"];
            this.company = details.data[0]["company"];
            this.shop = details.data[0]["shop"];
            this.departament = details.data[0]["departament"];
            this.sub = details.data[0]["sub"];
            this.CSDS = details.data[0]["CSDS"];
            this.administrator = details.data[1]["administrator"];
        } catch (error) {
            console.log(error.toString());
        }
    }
}