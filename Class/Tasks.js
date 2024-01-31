import Containers from "../Components/Containers.js";
import Form from "../Components/Form.js";
import List from "../Components/List.js";
import ProgressBar from "../Components/ProgressBar .js";
import TextArea from "../Components/TextArea.js";
import Title from "../Components/Title.js";
import { Connection } from "../Connection/Connection.js";

export default class Tasks {
    id;
    description;
    percent;
    state_description;
    state_id;
    priority;
    expire;
    csds;
    user_id;
    initial_date;
    final_date;

    full_description;
    task_item = [];
    task_user = [];
    csds = [];
    #ws;

    /**
     * Creates an instance of Tasks.
     * @date 1/23/2024 - 12:02:37 PM
     *
     * @constructor
     * @param {{id: number;description: string;percent: number;state_description: string;state_id: number;priority:number;expire: number;csds: [];user_id: number;initial_date: string;final_date:string;}} configs
     */
    constructor(configs, ws) {
        this.id = configs.id;
        this.description = configs.description;
        this.percent = configs.percent;
        this.state_description = configs.state_description;
        this.state_id = configs.state_id;
        this.priority = configs.priority;
        this.expire = configs.expire;
        this.csds = configs.csds;
        this.user_id = configs.user_id;
        this.initial_date = configs.initial_date;
        this.final_date = configs.final_date;
        this.#ws = ws;
    }

    async getDetails() {
        try {
            const connect = new Connection();
            let result = await connect.get(`&id=${this.id}`, 'GTPP/Task.php');
            if (result.error) throw new Error(result.message || 'Generic error');
            this.full_description = result.data.full_description;
            this.task_item = result.data.task_item;
            this.task_user = result.data.task_user;
            this.csds = result.data.csds;
        } catch (error) {
            console.error(error);
        }
    }

    async changeCheckedItem(id) {
        this.task_item.forEach(async (item, index) => {
            if (item.id == id) {
                this.task_item[index].check = !this.task_item[index].check;
                const bar = document.querySelector('.progress-bar');
                if (bar) {
                    const progress = new ProgressBar(this.task_item || []).calculateProgress().toFixed(2);
                    this.percent = progress;
                    const conn = new Connection();
                    let result = await conn.put({
                        task_id: item.task_id,
                        id: item.id,
                        check: item.check
                    }, 'GTPP/TaskItem.php');
                    console.log(result)
                    bar.setAttribute('aria-valuenow', progress);
                    bar.setAttribute('style', `width:${progress}%`);
                }
            }
        })
    }

    informeChangeItem(task) {
        this.#ws.informSending({
            user_id: localStorage?.userGTPP,
            object: {
                description: task.check ? "Um item foi marcado" : "Um item foi desmarcado",
                percent: this.percent,
                itemUp: task
            },
            task_id: this.id,
            type: 2
        });
    }

    taskElement() {
        const div = new Containers();
        const elementDiv = div.containerBasic({ element: this.taskHeader() });
        elementDiv.appendChild(this.taskBody());
        return elementDiv;
    }
    
    taskHeader() {
        const divHeader = document.createElement('div');
        divHeader.id = 'taskHeader';
        const title = new Title(this.description)
        divHeader.appendChild(title.main());
        return divHeader;
    }
    taskBody() {
        const divBody = document.createElement('div');
        divBody.id = 'taskBody';

        divBody.appendChild(this.taskArticle());

        const section = document.createElement('section');
        divBody.appendChild(section);

        return divBody;
    }
    taskArticle() {
        const article = document.createElement('article');
        const div = document.createElement('div');
        const listTask = document.createElement('div');

        const desc = new Form();
        const text = new TextArea({ text: this.full_description, id: 'taskFullDesc' });
        const container = new Containers();
        const progressBar = new ProgressBar(this.task_item || []);

        listTask.appendChild(this.listTaskItems(this.task_item || []));
        div.appendChild(progressBar.createProgressBar());
        div.appendChild(listTask);
        div.appendChild(desc.label({ label: 'Detalhes:' }));
        div.appendChild(container.containerBasic({ element: text.TextAreaEnable() }));
        div.appendChild(listTask);

        article.appendChild(div);
        return article;
    }
    listTaskItems(list) {
        const ul = document.createElement('ul');
        list.forEach(listElement => {
            const li = new List();
            listElement.onAction = async () => {
                await this.changeCheckedItem(listElement.id);
                this.informeChangeItem(listElement);
            };
            console.log(listElement);
            ul.appendChild(li.itemTask(listElement));
        });
        return ul;
    }
}