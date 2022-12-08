import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {requestGetUsers, tUsers} from "../requests/usersRequests";

export interface IUser {
name:string,money:number
}
export type tUsersState= {
	users: IUser[]
}
const initialState = {};

export const getUsers = createAsyncThunk(
	"usersData/getUsersData",
	async (_, thunkAPI) => {
		const response = await requestGetUsers(null);
		if (response.status === "ok") {
			return {
				data: response.data,
			};
		}
		throw new Error("false data");
	}
);


const usersSlice = createSlice({
	name: "usersData",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUsers.fulfilled, (state, action) => {
			//state.users =state.users;
		}),
			builder.addCase(getUsers.rejected, (state, action) => {
				console.log("err");
			});
	},
});

const { actions, reducer } = usersSlice;

export default reducer;
