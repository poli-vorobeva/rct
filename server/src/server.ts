import {RequestListener} from "http";
import {SocketServer} from "./SocketServer";
const http = require('http');
const port = 3000;
const requestHandler: RequestListener = (request, response) => {
	response.end('Serverhi!');
};

const server = http.createServer(requestHandler);
const socketService = new SocketServer(server)
server.listen(port, () => {
	console.log(`server is listening on ${port}`);
});
