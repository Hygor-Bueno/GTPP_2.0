import Button from "../Components/Button.js";
import Form from "../Components/Form.js";
import Modal from "../Components/Modal.js";
import Paragraph from "../Components/Paragraph.js";
import TextArea from "../Components/TextArea.js";
import Title from "../Components/Title.js";
import { saveButton } from "../Configuration/Configuration.js";
import { suspendedInput } from "../Configuration/Configuration.js";
import { Connection } from "../Connection/Connection.js";

/** Classe que representa uma tarefa suspensa.
 *  @example const suspendedTask = new SuspendedTask(colorsBD);
 */
export default class SuspendedTask {
    days = null;
    reason;
    task_id;
    state_id;
    bdColor;
    #ws;

    /**
     * Cria uma nova instância de SuspendedTask.
     * @param {string[]} colorsBD Cores principais que vem do banco de dados.
     * @param {string} ws websocket.
     */
    constructor(colorsBD, ws) {
        this.bdColor = colorsBD;
        this.#ws = ws;
    }

    /**
     * Cria um modal para tarefa suspensa.
     * @param {{state_id:number;description:string;state_description:string;}} config - Configurações para o modal.
     */
    suspended(config) {
        try {
            const modal = document.createElement('div');
            const divTitle = document.createElement('div')
            modal.setAttribute('modal-suspended', true);
            config.state_id == 1 || config.state_id == 2 ? modal.setAttribute('modalTodo', '') : null;
            modal.className = 'suspendedDesign';
            const title = new Title(config.description, 'modalTitle');
            const taskDesc =  new Paragraph(`${config.state_description}`);
            modal.appendChild(divTitle);
            divTitle.append(title.main(),taskDesc.simpleParagraph());
            modal.appendChild(this.modalRegisterReason(config));
            const modalRegister = new Modal();
            return modalRegister.modalDark({modal:modal});
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     * Cria um modelo de card com uma caixa de texto.
     * @param {{state_id:number;}} config - Configurações para o modelo.
     */
    modalRegisterReason(config) {
        try {
            const div = document.createElement('div');
            div.className = 'divModalReason';
            if(config.state_id == 1 || config.state_id == 2 || config.state_id == 6){
                div.appendChild(this.textArticleSuspended(config));
                div.setAttribute('modal-reason', true);
            } else if(config.state_id == 5) {
                this.inputFormUnlock(div, config);
                div.appendChild(this.buttonPut(config));
            } else {
                div.appendChild(this.buttonPut(config));
            }
            return div;
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     * Cria um botão para atualizar o estado da tarefa.
     * @param {string[] | number[] | any[]} config
     */
    buttonPut(config) {
        try{
            const btnSave = new Button();
            const configBtnSave = {...saveButton, onAction: async () => {
                await this.stopTask(config);
                await this.unlockTask(config);
            }};
            return btnSave.Button(configBtnSave);
        }catch (error) {
            console.error(error.message);
        }
    }
    
    
    /**
     * 
     * @description faz o arquivamento da tarefa.
     * @async
     * @param {{id:number;state_id:number;}} config
     */
    async stopTask(config) {
        let connection = new Connection();
        if(config.state_id == 4 || config.state_id == 3) {
            let result = await connection.put({days:null, reason: null, task_id: config.id}, 'GTPP/TaskState.php');
            if(!result.error) {
                let modalTask = document.getElementById('modalTask');
                const modal = new Modal();
                this.state_id = result.data[0].id;
                this.infoChangeItem(config);
                modal.openModal('Enviado com sucesso!', 'Tarefa desarquivada com sucesso!', document.querySelector("#containerMain section"), 1);
                modalTask.remove();
            }
        }
    }

    
   /**
    * @description faz o desbloqueio da tarefa.
    * @async
    * @param {{state_id:number}} config
    */
   async unlockTask(config) {
       const connection = new Connection();
        if (config.state_id == 5) {
            let result = await connection.put({reason: null, ...this}, 'GTPP/TaskState.php');
            if(!result.error) {
                const modal = new Modal();
                this.state_id = result.data[0].id;
                this.newChangeForDateTime(config);
                modal.openModal('Enviado com sucesso!', 'Tarefa desarquivada com sucesso!', document.querySelector("#containerMain section"), 1);
            }
        }
   }

    
    /**
     * Define o número de dias para a tarefa.
     * @param {string} days - Número de dias.
     * @param {Object} config - Configurações para os dias.
     */
    setDays(days, config) {
       try {
            this.days = days;
            this.reason = null;
            this.task_id = config.id;
            console.log(this);
       } catch (error) {
            console.error(error.message);
       }
    }

    /**
     * Cria um formulário de entrada para os dias.
     * @param {HTMLElement} local - Elemento HTML onde o formulário será inserido.
     * @param {Object} config - Configurações para o formulário.
     */
    inputFormUnlock(local, config) {
        try {
            const formObj = new Form();
            suspendedInput.listfields.onChange = value => this.setDays(value, config);
            local.appendChild(formObj.ContainerForm(suspendedInput));
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Método responsável por criar uma textarea que inicia desabilitada para edição e que possúi componentes para controle dela. 
     * @param {{id:number;percent:number;}} config
     */
    textArticleSuspended(config) {
        const div = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.innerText = `Deseja mesmo mudar o status para "parado"?`;
        const textArea = new TextArea({
            text: this.reason, id: 'taskSuspended', onAction: async () => {
               await this.updatingChange(config);
            }
        });
        div.append(h3, textArea.TextAreaEnable());
        return div;
    }

    /**
     * faz a atualização para arquivado.
     * @param {{id:number;percent:number;}} config
     */
    async updatingChange(config) {
        try {
            let validateInput = document.querySelector('#taskSuspended textarea');
            if(validateInput.value.length > 0) {
                const result = await conn.put({days: null, reason: text, task_id: config.id}, 'GTPP/TaskState.php');
                if(!result.error) {
                    let modalTask = document.getElementById('modalTask');
                    const modal = new Modal();
                    this.state_id = result.data[0].id;
                    this.infoChangeItem(config);
                    modal.openModal('Enviado com sucesso!', 'Verifique a caixa de "parado!"', document.querySelector("#containerMain section"), 1);
                    modalTask.remove();
                }
            }
           } catch (error) {
                console.error(error.message);
           }
    }
    
    // essa função é serve para fazer o desbloqueio das datas e atualizar elas!
    // newChangeForDateTime(config) {
    //     this.#ws.informSending({
    //         user_id: localStorage?.userGTPP,
    //         object: {
    //             description: "send",
    //             new_final_date: this.days,
    //             task_id: config.id,
    //             state_id: this.state_id,
    //             percent: config.percent,
    //         },
    //         task_id: config.id,
    //         type: 6
    //     });
    // }

    /**
     * Abrindo uma sessão de comunicação interativa com o servidor.
     * @param {{id:number;percent:number;}} config
     */
    infoChangeItem(config) {
        this.#ws.informSending({
            user_id: localStorage?.userGTPP,
            object: {
                description: "send",
                percent: config.percent,
                task_id: config.id,
                state_id: this.state_id,
            },
            task_id: config.id,
            type: 6
        });
    }

}
