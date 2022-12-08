import * as React from "react";
import Board from "./Board/Board";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {SocketModel} from "../SocketModel";
import StartScreen from "./StartScreen/StartScreen";
import styles from './styles.css'

export type tUser = { name: string, index: number, money: number, time: number,isMakeBet:boolean
	missedRound:number,
	payMethod:string,	isActive:boolean,	guaranty:string,	prodTime:string}
export type tUsers = tUser[]
export type tOnConnect = {
	users: tUsers,
	activeUser: number
}

const App = () => {
	const [websocket, setWebsocket] = useState<SocketModel>(null)
	const [users, setUsers] = useState<tUsers>([])
	const [active, setActive] = useState<number>(null)
	const [showBoard, setShowBoard] = useState(false)
	useEffect(() => {
		const _websocket = new SocketModel();
		_websocket.onMessage = (text) => {
		};
		_websocket.onAddConnection = (usersData: tOnConnect) => {
			setUsers(usersData.users)
			setActive(usersData.activeUser)
		}
		setWebsocket(_websocket);
		return () => {
			_websocket.destroy();
		};
	}, [])
	return (
		<div className={styles.appWrapper}>
			{
				showBoard
					? <Board onHideBoard={() => setShowBoard(false)} users={users} active={active}/>
					: <StartScreen  users={users} onShowBoard={() => setShowBoard(true)}/>
			}
		</div>
	)
}
export default App