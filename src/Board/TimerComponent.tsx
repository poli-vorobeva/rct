import * as React from "react";

const withZero = (number: number) => {
	return number > 9 ? `${number}` : `0${number}`
}
const Timer = ({tm}:{tm:number}) => {
	const minutes = withZero(Math.floor(tm / 60))
	const secs = withZero(tm - +minutes * 60)
	return <span>
		<span>{`00:${minutes}:${secs}`}</span>
	</span>
}
export default Timer