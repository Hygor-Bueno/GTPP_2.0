var ws
var isConnected = false;
const id = localStorage.getItem('userGTPP')

export class WebSocketGTPP {
    Connect() {
        const id = localStorage?.userGTPP;
        const AUTH = localStorage?.tokenGTPP;

        if (AUTH && AUTH !== undefined && id) {
            const socket = new WebSocket("ws://192.168.0.99:3333");

            let isConnected = false;
            let time_out;

            function Ping() {
                if (!isConnected) {
                    return;
                }
                socket.send("__ping__");
                time_out = setTimeout(function () {
                    console.log("error");
                }, 5000);
                // console.log('Ping');
            }

            //Pong para cancel o TimeOut que estava aguardando no Ping
            function Pong() {
                clearTimeout(time_out);
                // console.log("connected Pong");
            }

            try {
                socket.onopen = function () {
                    //Autenticar o usuário
                    // console.log("conexão aberta");
                    let jsonString = {
                        auth: AUTH,
                        app_id: 3,
                    };
                    // console.log("connected");
                    // console.log(socket);
                    socket.send(JSON.stringify(jsonString));

                    //Enviar um ping para o servidor a cada 10 segundos
                    setInterval(Ping, 10000);
                    isConnected = true;
                };

                socket.onerror = function (ev) {
                    // console.log(ev.data);
                    console.log("tryload");
                };

                socket.onclose = function () {
                    console.log("error");
                    getWebSocket({});
                    //Tentar reconectar o WebSocket a cada 1 segundo
                    setTimeout(function () {
                        Connect();
                    }, 1000);
                    isConnected = false;
                };

                socket.onmessage = function (ev) {
                    //Ao receber o pong do servidor, cancela o TimeOut
                    if (ev.data.toString() === "__pong__") {
                        Pong();
                        return;
                    }
                    let response = JSON.parse(ev.data);

                    console.log(response);
                    if (!response.error) {
                        if (response.type == 2){
                            const task_item = document.getElementById(`task_item_${response.object.itemUp.id}`).checked = response.object.itemUp.check;
                            console.log(task_item);
                        }
                    }
                    //Ao receber mensagem que não seja pong
                };
            } catch (error) {
                // connection.innerText = error;
            }
        }
    }
}