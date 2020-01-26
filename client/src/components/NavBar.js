import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const NavBar = () =>{
    const {logout} = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        logout()
    }

    return(
        <nav>
            <div className="nav-wrapper p02 purple darken-4">
                <a href="/" className="brand-logo left">Сокращение ссылок</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to={'/create'}>Создать</NavLink></li>
                    <li><NavLink to='/links'>Ссылки</NavLink></li>
                    <li><a href='/' onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}