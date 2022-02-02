import {useDispatch, useSelector} from "react-redux";
import {IState} from "../../../interfaces";
import {IUser} from "../../../../../interfaces";
import React, {useEffect} from "react";
import {userFetchUsers} from "../../../store/features/user/user-slice";

const Users = () => {

    const dispatch = useDispatch()
    const user: IUser = useSelector((state: IState) => state.user)
    const token: string | null = useSelector((state: IState) => state.user.token)
    const allUsers: IUser[] = useSelector((state: IState) => state.user.allUsers) || []

    useEffect(() => {
        if (token)
        dispatch(userFetchUsers(token))
    }, [user, token])

    return <>
        {!token && <>you need login</>}
        {token && allUsers.map((u, i) => <div key={i}> {u.username} {u.email}</div>)}
    </>

}

export default Users