/**
 * Classe responsável por salvar os dados do usuário no banco de dados do navegador.
 * @date 11/01/2024 - 8:48:24 AM
 * @author Hygor Bueno.
 * @export
 * @class IndexedDBManager
 */
export default class IndexedDBManager {
    /**
     * Nome do banco de dados e versão.
     * @date 11/01/2024 - 8:55:48 AM
     * @author Hygor Bueno.
     * @constructor
     */
    constructor() {
        this.dbName = "register";
        this.dbVersion = 1;
    }

    /**
     * Método para abrir o banco de dados
     * @date 11/01/2024 - 8:55:35 AM
     * @author Hygor Bueno.
     * @returns {object}
     */
    openDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = (event) => {
                reject({ error: true, message: "Open database failed." });
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve({ error: false, data: "database opened successfully." });
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Cria um objeto de armazenamento chamado "User" com uma chave primária chamada "id"
                const objectStore = db.createObjectStore("User", { keyPath: "id" });

                // Cria um índice chamado "url" para buscar por URL
                objectStore.createIndex("id", "id", { unique: false });
            };
        });
    }

    /**
     * Método para adicionar um usuário ao banco de dados.
     * @date 11/01/2024 - 8:56:42 AM
     * @author Hygor Bueno.
     * @param {object} user
     * @returns {object}
     */
    addUser(user) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject({ error: true, message: "Database is not open." });
                return;
            }

            const transaction = this.db.transaction(["User"], "readwrite");
            const objectStore = transaction.objectStore("User");

            const request = objectStore.add(user);

            request.onsuccess = (event) => {
                resolve({ error: false, data: "User successfully added to the database." });
            };

            request.onerror = (event) => {
                reject({ error: true, message: "Error adding user to database." });
            };
        });
    }
    
    /**
     * Deleta o usuário  pelo Id dele.
     * @date 11/01/2024 - 9:00:04 AM
     * @author Hygor Bueno.
     * @param {number} id
     * @returns {object}
     */
    deleteUserForID(id) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject({ error: true, message: "Database is not open." });
                return;
            }

            const transaction = this.db.transaction(["User"], "readwrite");
            const objectStore = transaction.objectStore("User");

            const request = objectStore.delete(id);

            request.onsuccess = (event) => {
                resolve({ error: false, data: "User successfully deleted from the database." });
            };

            request.onerror = (event) => {
                reject({ error: true, message: "Error when deleting user from database." });
            };
        });
    }

    
    /**
     * Método para recuperar um usuário pelo ID.
     * @date 11/01/2024 - 9:03:01 AM
     * @author Hygor Bueno.
     * @param {number} id
     * @returns {object}
     */
    getUserForID(id) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject({ error: true, message: "Database is not open." });
                return;
            }

            const transaction = this.db.transaction(["User"], "readonly");
            const objectStore = transaction.objectStore("User");

            const request = objectStore.get(id);

            request.onsuccess = (event) => {
                const user = event.target.result;
                if (user !== undefined) {
                    resolve({ error: false, data: user });
                } 
                else {
                    resolve({ error: true, message: "User not found." });
                }
            };
            

            request.onerror = (event) => {
                reject({ error: true, message: "Error retrieving user from database." });
            };
        });
    }

}
