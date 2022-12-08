import {tUsers} from "./client/requests/usersRequests";
import {tOnConnect} from "./client/src/App";

export interface IServerResponseMessage {
	type: string;
	content: string;
}
export interface IServerRequestMessage {
	type: string;
	content: string;
}

export class SocketModel {
	private websocket: WebSocket = null;
	public onMessage: (text: string) => void;
	public onGetUsers:(userList:tUsers)=>void;
	public onAddConnection:(usersData:tOnConnect)=>void
	constructor() {

		//const _websocket = new window.WebSocket('ws://localhost:3001/');
		const _websocket = new window.WebSocket('ws://srvrtrd-production.up.railway.app/')
			_websocket.onopen = () => {
			this.websocket = _websocket;
		};
		_websocket.onmessage = (ev) => {
			const response: IServerResponseMessage = JSON.parse(ev.data);
			if(response.type==='onAddConnection'){
				this.onAddConnection(JSON.parse(response.content))

			}
		};

		_websocket.onerror = () => {};
		_websocket.onclose = () => {};
	}
	destroy() {
		if (this.websocket == null) return;
		this.websocket.onclose = null;
		this.websocket.close();
	}

	join() {
		this.sendRequest('join', '');
	}

	sendRequest(type: string, stringContent: string) {
		const request: IServerRequestMessage = {
			type: type,
			content: stringContent,
		};
		this.websocket.send(JSON.stringify(request));
	}
}