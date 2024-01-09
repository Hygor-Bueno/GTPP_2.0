export default class IndexedDBManager {
    constructor() {
        // Nome do banco de dados e versão
        this.dbName = "register";
        this.dbVersion = 1;
    }

    // Método para abrir o banco de dados
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

                // Cria um objeto de armazenamento chamado "Usuarios" com uma chave primária chamada "id"
                const objectStore = db.createObjectStore("User", { keyPath: "id" });

                // Cria um índice chamado "url" para buscar por URL
                objectStore.createIndex("url", "url", { unique: false });
            };
        });
    }

    // Método para adicionar um usuário ao banco de dados
    addUser(usuario) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject({ error: true, message: "Database is not open." });
                return;
            }

            const transaction = this.db.transaction(["User"], "readwrite");
            const objectStore = transaction.objectStore("User");

            const request = objectStore.add(usuario);

            request.onsuccess = (event) => {
                resolve({ error: false, data: "User successfully added to the database." });
            };

            request.onerror = (event) => {
                reject({ error: true, message: "Error adding user to database." });
            };
        });
    }
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
            resolve({ error: false, data: "Usuário deletado com sucesso do banco de dados." });
          };
    
          request.onerror = (event) => {
            reject({ error: true, message: "Erro ao deletar usuário do banco de dados." });
          };
        });
      }

    // Método para recuperar um usuário pelo ID
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
                const usuario = event.target.result;
                if (usuario) {
                    resolve({ error: false, data: usuario });
                } else {
                    reject({ error: true, message: "Usuário não encontrado." });
                }
            };

            request.onerror = (event) => {
                reject({ error: true, message: "Erro ao recuperar usuário do banco de dados." });
            };
        });
    }
}
