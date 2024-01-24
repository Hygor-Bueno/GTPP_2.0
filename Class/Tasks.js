import Containers from "../Components/Containers.js";
import Form from "../Components/Form.js";
import Paragraph from "../Components/Paragraph.js";
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

    /**
     * Creates an instance of Tasks.
     * @date 1/23/2024 - 12:02:37 PM
     *
     * @constructor
     * @param {{id: number;description: string;percent: number;state_description: string;state_id: number;priority:number;expire: number;csds: [];user_id: number;initial_date: string;final_date:string;}} configs
     */
    constructor(configs) {
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
    }

    async getDetails() {
        try {
            const connect = new Connection();
            let result = await connect.get(`&id=${this.id}`, 'GTPP/Task.php');
            if(result.error) throw new Error(result.message || 'Generic error');
            console.log(result);
            this.full_description = result.data.full_description;
            this.task_item = result.data.task_item;
            this.task_user = result.data.task_user;
            this.csds = result.data.csds;

        } catch (error) {
            console.error(error);
        }
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
        const label = new Form();
        label.label({ label: this.description });
        divHeader.appendChild(label.label({ label: this.description }));
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
    taskArticle(){
        const article = document.createElement('article');
        const div = document.createElement('div');
        const desc = new Form();
        const p = new Paragraph(this.full_description);        
        div.appendChild(desc.label({label:'Detalhes:'}));

        article.appendChild(div);
        return article;
    }
}