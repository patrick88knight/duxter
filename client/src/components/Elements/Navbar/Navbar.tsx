import {Collapse, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem} from "reactstrap";
import {Link} from "react-router-dom";
import {userLogout} from "../../../store/features/user/user-slice";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {IState} from "../../../interfaces";
import {IUser} from "../../../../../interfaces";

const Navigation = () => {

    const token: string | null = useSelector((state: IState) => state.user.token)
    const user: IUser = useSelector((state: IState) => state.user)
    const dispatch = useDispatch()

    return <Navbar color="light" expand="md" light>
        <NavbarBrand href="/">
            LOGO
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() {
        }}/>
        <Collapse navbar>
            <Nav className="me-auto" navbar>
                <NavItem>
                    <Link className={"nav-link"} to="/signup/">
                        Signup
                    </Link>
                </NavItem>
                {!token && <NavItem>
                    <Link className={"nav-link"} to="/login">
                        Login
                    </Link>
                </NavItem>}
                {token && <NavItem>
                    <Link className={"nav-link"} to={"/"} onClick={e => {
                        dispatch(userLogout({}))
                    }}>
                        Logout
                    </Link>
                </NavItem>}
                <NavItem>
                    <Link className={"nav-link"} to="/users">
                        Users
                    </Link>
                </NavItem>
            </Nav>
            <NavbarText>
                {user.username}
            </NavbarText>
        </Collapse>
    </Navbar>
}

export default Navigation