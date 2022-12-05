import {RequestListener} from "http";
import {SocketService} from "./SocketService";
const http = require('http');
const port = 3000;
const requestHandler: RequestListener = (request, response) => {
	response.end('Serverhi!');
};

const server = http.createServer(requestHandler);
const socketService = new SocketService(server)
server.listen(port, () => {
	console.log(`server is listening on ${port}`);
});