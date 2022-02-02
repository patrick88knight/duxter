import React, {FormEvent, useState} from "react";
import {IUser} from "../../../../../interfaces";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {user} from "../../../services/User";

const Signup = () => {

    const [newUserData, setNewUserData] = useState<IUser>({
        username: "",
        email: "",
        password: ""
    })

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        user.signup(newUserData)
            .then(e => console.log("then",e))
            .catch(e => console.log("catch",e))
    }

    return <Form inline onSubmit={onFormSubmit}>
        <FormGroup className="mt-5 me-sm-2 mb-sm-0">
            <Label className="me-sm-2" for="name">
                username
            </Label>
            <Input id="name" name="name" placeholder="name" type="text"
                   onInput={(e: React.ChangeEvent<HTMLInputElement>) => setNewUserData({
                       ...newUserData,
                       username: e.target.value
                   })}
            />
        </FormGroup>
        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
            <Label className="me-sm-2" for="password">password</Label>
            <Input id="password" name="password" placeholder="password" type="password"
                   onInput={(e: React.ChangeEvent<HTMLInputElement>) => setNewUserData({
                       ...newUserData,
                       password: e.target.value
                   })}
            />
        </FormGroup>
        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
            <Label className="me-sm-2" for="email">email</Label>
            <Input id="email" name="email" placeholder="email" type="email"
                   onInput={(e: React.ChangeEvent<HTMLInputElement>) => setNewUserData({
                       ...newUserData,
                       email: e.target.value
                   })}
            />
        </FormGroup>
        <Button>
            signup
        </Button>
    </Form>


}

export default Signup