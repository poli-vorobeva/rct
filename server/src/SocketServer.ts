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

const users= [
	{name:'bob',money:20202},
	{name:'tom',money:555022},
	{name:'jey',money:33003}
]
const connections=new Set()

export class SocketServer {
	constructor(server: http.Server) {
		const wsServer = new websocket.server({
			httpServer: server,
		});

		wsServer.on('request', (request) => {
			const connection = request.accept(undefined, request.origin);
			connections.add(connection)

			connection.on('message', (_message) => {
				if (_message.type === 'utf8') {
					const message = _message as IUtf8Message;
					const requestMessage: IServerRequestMessage = JSON.parse(
						message.utf8Data
					);

					if (requestMessage.type === 'message') {
						console.log("istmess-----",requestMessage.content)
						this.sendResponse(connection,'answr',JSON.stringify(users))
					}
				} else {
					throw new Error('Not utf8');
				}
			});

			connection.on('close', (reasonCode, description) => {
				console.log('Client has disconnected.');
			});
		});
	}

	sendResponse(client: connection, type: string, stringContenrt: string) {
		const responseMessage: IServerResponseMessage = {
			type: type,
			content: stringContenrt,
		};
		client.sendUTF(JSON.stringify(responseMessage));
	}
}