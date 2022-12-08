import { configureStore } from "@reduxjs/toolkit";
import usersData, {tUsersState} from '../reducer/usersReducer'

export type tStateType={
	usersData:tUsersState
}
const store = configureStore({
	reducer: {usersData},
	//middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export default store;