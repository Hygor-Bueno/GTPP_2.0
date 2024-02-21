import Router from './Routers/Router.js'
export class WebSocketGTPP {
    constructor() {
        this.socket = null;
        this.isConnected = false;
        this.time_out = null;
        this.id = localStorage?.userGTPP;
        this.AUTH = localStorage?.tokenGTPP;
    }

    Connect() {
        if (this.AUTH && this.AUTH !== undefined && this.id) {
            this.socket = new WebSocket("ws://192.168.0.99:3333");
            try {
                this.socket.onopen = () => this.onOpen();
                this.socket.onerror = (ev) => this.onError(ev);
                this.socket.onclose = () => this.onClose();
                this.socket.onmessage = (ev) => this.onMessage(ev);
            } catch (error) {
                console.error(error)
            }
        }
    }

    Ping() {
        if (!this.isConnected) {
            return;
        }
        this.socket.send("__ping__");
        this.time_out = setTimeout(() => {
            console.log("error");
        }, 5000);
    }

    Pong() {
        clearTimeout(this.time_out);
    }

    onOpen() {
        console.log("conexão aberta");
        let jsonString = {
            auth: this.AUTH,
            app_id: 3,
        };
        this.socket.send(JSON.stringify(jsonString));
        setInterval(() => this.Ping(), 10000);
        this.isConnected = true;
    }

    onError(ev) {
        console.log("tryload");
    }

    onClose() {
        console.log("error");
        setTimeout(() => {
            this.Connect(); // Corrigindo a chamada de método Connect
        }, 1000);
        this.isConnected = false;
    }

    onMessage(ev) {
        if (ev.data.toString() === "__pong__") {
            this.Pong();
            return;
        }

        let response = JSON.parse(ev.data);
        if (!response.error && response.send_user_id != this.id) {
            console.log(response)
        }

        if (response.error && response.message.includes("This user has been connected to another place")) {
            const router = new Router();
            router.navigation('Login');
        }

        if (!response.error && response.type == 2) {
            const task_item = document.getElementById(`task_item_${response.object.itemUp.id}`);
            if (task_item) {
                task_item.checked = response.object.itemUp.check;
                const progressBar = document.querySelector('.progress-bar');
                if (progressBar && response?.object?.percent) {
                    progressBar.setAttribute('aria-valuenow', response.object.percent);
                    progressBar.setAttribute('style', `width:${response.object.percent}%`);
                }
            }

            //Porcentagem simpleCard
            const percent = document.getElementById(`percent_task_${response.task_id}`);
            if (percent) percent.innerText = `${response.object.percent}%`;
        }
        console.log(response)
    }

    informSending(json) {
        if (this.isConnected) {
            console.log(this.socket);
            this.socket.send(JSON.stringify(json));
        }
    }
    // disconnect() {
    //     // const close = {            
    //     //      "send_user_id": this.id,
    //     //      "type": -1,
    //     //      "state": "disconnected"
    //     //  }
    //     //  this.socket.send(JSON.stringify(close))
    //     this.socket.close();
    //     // this.socket.onclose();
    //     // console.log(this.socket)
    //     }
}
