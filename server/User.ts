import UserModel from "./models/User"
import {IUser} from "../interfaces";

class User {

    get = async (): Promise<IUser[]> => {
        return (await UserModel.find({})) || []
    }

    getByUsername = async (username: string): Promise<IUser | any> => {
        return await UserModel.findOne({username: username})
            .then(user => user)
            .catch(err => {
                return null
            })
    }

    set = (user: IUser) => {
        const doc = new UserModel(user)
        doc.save()
    }

    test = () => {
        console.log("test")
    }

}

const user = new User()

export default user