import {IUser} from "../reducer/usersReducer";

export type tUsers=IUser[]

export interface IResponseUsers{
	status: string;
	data: tUsers[];
}

export async function requestGetUsers(
	payload:null
): Promise<IResponseUsers> {
	try {
		const response = await fetch(
			"http://localhost:3000",
			{
				method: "GET",
				body: '',
			}
		);
		return response.json();
	} catch (e) {
		throw new Error(e);
	}
}