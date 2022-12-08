import * as React from "react";
import styles from './styles.css'
import {tUsers} from "../App";

interface IStartScreenProps {
	onShowBoard: () => void,
	users: tUsers
}

const StartScreen = ({onShowBoard, users}: IStartScreenProps): JSX.Element => {
//todo get start time- on connection 20min and refresh every sec

	return (
		<div className={styles.startWrapper}>
			<div>
				<h5>Текущие тогри</h5>
				<h6>Изготовление Подогревателей</h6>
			</div>
			<p>Количество активных участников :{users.filter(u=>u.isActive).length} </p>
			<div>
				<span>Участники:</span>
				<ul>
					{
						users.map((user,i) => <li key={i}>{user.name}</li>)
					}
				</ul>
			</div>
			<button className={styles.button} onClick={() => onShowBoard()}>Смотреть торги</button>
		</div>
	)
}
export default StartScreen