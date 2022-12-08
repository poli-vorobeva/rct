import {tUsers} from "../App";
import * as React from "react";
import styles from './styles.css'

interface ITrProps {
	users: tUsers,
	field: string,
	trTitles: Record<string, string>,
	active: number
}

const Tr = ({users, field, trTitles}: ITrProps): JSX.Element => {
	return (
		<tr className={styles.tableRow}>
			<th>{trTitles[field as keyof typeof trTitles]}</th>
			{users.map((n,i) => {
				const isBet = field === 'money' && n.isMakeBet
				const isSitOut = !!n.missedRound
				return <th key={i}
					className={isSitOut ? styles.burn:undefined}>
					<p style={{background: isBet && 'red'}}>{n[field as keyof typeof n]}
					</p>
				</th>
			})}
		</tr>
	)
}
export default Tr