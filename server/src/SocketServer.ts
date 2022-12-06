import * as http from "http";
import {connection, IUtf8Message} from "websocket";

const websocket = require('websocket')

export interface IServerRequestMessage {
	type: string;
	content: string;
}

export interface IServerResponseMessage {
	type: string;
	content: string;
}

let active = 0
const limit = 10
const connections = []

class Bot {
	time: number
	index: number
	name: string
	money: number

	constructor(index, name, money) {
		this.index = index
		this.time = 0
		this.name = name
		this.money = money
	}

	public addTime(num) {
		console.log("frombot ",num)
				this.time = num
	}

}

const users = [new Bot(0, 'Jou', 2222344),
	new Bot(1, 'Mary', 121244),
	new Bot(2, 'Nick', 299344)]

let range = {
	from: 1,
	to: 5,
	async* [Symbol.asyncIterator]() {
		for (let value = this.from; value <= this.to; value++) {
			await new Promise(resolve => setTimeout(resolve, 1000));
			yield value;
		}
	}
};

export class SocketServer {
	constructor(server: http.Server) {
		const wsServer = new websocket.server({
			httpServer: server,
		});
		wsServer.on('request', (request) => {
				const connection = request.accept(undefined, request.origin);
				//connections.forEach(c=> this.sendResponse(connection, 'onAddConnection', JSON.stringify({users, activeUser: active})))

//одни получет управление и дальше он всем кроме себя рассылает свое текущее время каждую секунду, потом
				//ход переходит ко второму и так по кругу.
				if (!connections.includes(connection)) {
					console.log('already')
					connections.push(connection)
					this.sendResponse(connection, 'onAddConnection', JSON.stringify({users, activeUser: active}))
					//this.sendResponse(connection, 'time', `${i}`)
				}

				if (connections.length == 1) {
					(async () => {
						for await (let value of range) {
							if(!value){
								console.log('end')
							}
							users[active].addTime(value)
							connections.forEach(c=>{
								this.sendResponse(c, 'onAddConnection', JSON.stringify({users, activeUser: active}))

							})

						}
					})();
					//console.log('$$##',users[active].getTime())
					// users[active].addTime()
					// 	.then(r => {
					// 		console.log("&^^^")
					// 		this.sendResponse(connection, 'onAddConnection', JSON.stringify({users, activeUser: active}))
					// 	})

				}
				connection.on('message', (_message) => {
					if (_message.type === 'utf8') {
						const message = _message as IUtf8Message;
						const requestMessage: IServerRequestMessage = JSON.parse(
							message.utf8Data
						);

						if (requestMessage.type === 'message') {
							console.log("istmess-----", requestMessage.content)
							this.sendResponse(connection, 'answr', JSON.stringify(users))
						}
					} else {
						throw new Error('Not utf8');
					}
				});

				connection.on('close', (reasonCode, description) => {
					console.log('Client has disconnected.');
				});
			}
		);
	}

	sendResponse(client
								 :
								 connection, type
								 :
								 string, stringContenrt
								 :
								 string
	) {
		const responseMessage: IServerResponseMessage = {
			type: type,
			content: stringContenrt,
		};
		client.sendUTF(JSON.stringify(responseMessage));
	}
}