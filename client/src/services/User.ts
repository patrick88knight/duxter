import axios from "axios";
import {IUser} from "../../../interfaces";

class User {

    public fetchUsers = async (token: string): Promise<IUser[]> =>
        (await axios.get('/getUsers', {
            headers: {
                Authorization: token
            }
        })).data
    public signup = async (user: IUser): Promise<boolean> => (await axios.post('/signup', user))
    public login = async (user: IUser): Promise<string> => {
        console.log(user)
        return (await axios.post('/login', user)).data.token
    }
    public my = async (token: string): Promise<IUser> =>
        (await axios.get('/me', {
            headers: {
                Authorization: token
            }
        })).data

}

export const user = new User()