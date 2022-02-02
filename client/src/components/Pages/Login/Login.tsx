import React, {FormEvent, useState} from "react";
import {IUser} from "../../../../../interfaces";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {userLogin} from "../../../store/features/user/user-slice";
import {IState} from "../../../interfaces";
import {Navigate} from "react-router-dom";

const Login = () => {

    const dispatch = useDispatch()
    const [userData, setUserData] = useState<IUser>({
        username: "",
        email: "",
        password: ""
    })
    const token: string | null = useSelector((state: IState) => state.user.token)

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(userLogin(userData))
    }

    return <Form inline onSubmit={onFormSubmit}>
        {token && <Navigate to="/"/>}
        <FormGroup className="mt-5 me-sm-2 mb-sm-0">
            <Label className="me-sm-2" for="name">
                username
            </Label>
            <Input id="name" name="name" placeholder="name" type="text"
                   onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({
                       ...userData,
                       username: e.target.value
                   })}
            />
        </FormGroup>
        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
            <Label className="me-sm-2" for="password">password</Label>
            <Input id="password" name="password" placeholder="password" type="password"
                   onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({
                       ...userData,
                       password: e.target.value
                   })}
            />
        </FormGroup>
        <Button>
            Login
        </Button>
    </Form>
}

export default Login