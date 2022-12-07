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
let connections = []

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

	randomSum() {
		const sum = Math.round(Math.random() * 100)
		return sum < this.money ? sum : this.money
	}

	actionStep() {
		return Math.floor(Math.random() * range.to) + 1
	}

	isBet() {
		return !!Math.round(Math.random())
	}

	botAction(connections: connection[]) {
		console.log("botAction")
		return async () => {
			for await (let value of range) {
				if (value === this.actionStep()) {
					this.money -= this.randomSum()
				}
				if (value && value !== this.time) {
					console.log('val', value, '-----activ', active)
					this.time = value
					console.log(connections.length,'##$$#')
					connections.forEach(c => {
						console.log('------!!!',connections.length)
						sendResponse(c, 'onAddConnection',
							JSON.stringify({users, activeUser: active}))
					})
				}
			}
		}
	}
}

//todo stop bots
//todo delete overstep in generator
let users = [
	new Bot(0, 'Jou', 2222344),
	new Bot(1, 'Mary', 121244),
	new Bot(2, 'Nick', 299344)
]
let timeout = null
let range = {
	from: 12,
	to: 0,
	async* [Symbol.asyncIterator]() {
		for (let value = this.from; value > this.to; value--) {
			if (timeout) {
				clearTimeout(timeout)
				timeout = null
			}
			await new Promise(resolve => timeout = setTimeout(resolve, 1000));
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
				if (!connections.includes(connection)) {
					connections.push(connection)
					sendResponse(connection, 'onAddConnection', JSON.stringify({users, activeUser: active}))
				}

				if (connections.length == 1) {
					const r = async () => {
						const t = users[active].botAction(connections)()
						t.then(() => {
							active + 1 < users.length ? active++ : active = 0
							if (!!connections.length) r()
							else {
								users = [
									new Bot(0, 'Jou', 2222344),
									new Bot(1, 'Mary', 121244),
									new Bot(2, 'Nick', 299344)]
								active = 0
							}
						})
					}
					r()
				}
				if (connections.length === 0 && timeout) {
					clearTimeout(timeout)
					timeout = null
				}

				connection.on('message', (_message) => {
					if (_message.type === 'utf8') {
						const message = _message as IUtf8Message;
						const requestMessage: IServerRequestMessage = JSON.parse(
							message.utf8Data
						);

						if (requestMessage.type === 'message') {
							sendResponse(connection, 'answr', JSON.stringify(users))
						}
					} else {
						throw new Error('Not utf8');
					}
				});

				connection.on('close', (reasonCode, description) => {
					//connections = connections.filter(c => c != connection)
					connections.splice(connections.indexOf(connection),1)
					console.log("CLOSE")
				});
			}
		);
	}

}

function sendResponse(client: connection, type: string, stringContent: string) {
	const responseMessage: IServerResponseMessage = {
		type: type,
		content: stringContent,
	};
	client.sendUTF(JSON.stringify(responseMessage));
}