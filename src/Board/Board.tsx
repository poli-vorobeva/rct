import * as React from "react";
import {tUsers} from "../App";
import Timer from "./TimerComponent";
import styles from './styles.css'
import Tr from "./Tr";

const Board = ({users, active, onHideBoard}: { users: tUsers, active: number, onHideBoard: () => void }) => {
	const rowStyles = {
		width: '300px',
		height: '100px',
		display: 'flex',
	}

	const trTitles={
		time:'Время на ход', name:'Имя',money:'Ставка', payMethod:'Метод оплаты',
		guaranty:'Гарантия', prodTime:'Время изготовления'
	}
	return (
		<div className={styles.boardWrapper}>
			<button onClick={() => onHideBoard()}>close</button>
			<table>
				<tbody>
				<tr className={styles.tableRow}>
					<th>{trTitles.time}</th>
					{users.map((n,i) => {

						return (
							<th key={i}>
								<p style={{display: "block"}}>{
									(active === n.index) && <Timer tm={n.time}/>
								}
								</p>
							</th>
						)
					})}
				</tr>
				{
					['name','money', 'payMethod', 'guaranty', 'prodTime']
						.map((f,i) => <Tr key={i} active={active} trTitles={trTitles} users={users} field={f}/>)
				}
				</tbody>

			</table>
		</div>
	)
}
export default Board