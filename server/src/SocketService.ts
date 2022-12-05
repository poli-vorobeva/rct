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

export class SocketService {
	constructor(server: http.Server) {
		const wsServer = new websocket.server({
			httpServer: server,
		});

		wsServer.on('request', (request) => {
			const connection = request.accept(undefined, request.origin);
			connection.on('message', (_message) => {
				if (_message.type === 'utf8') {
					const message = _message as IUtf8Message;
					const requestMessage: IServerRequestMessage = JSON.parse(
						message.utf8Data
					);

					if (requestMessage.type === 'message') {
					//
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