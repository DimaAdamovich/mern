import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const [form, setForm] = useState({
        email: '', password: ''
    })
    const {loading, request, error, clearError} = useHttp()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() =>{
        window.M.updateTextFields()
    }, [])

    const handleRegister = async () => {
        try {
            const data = await request('api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
        }
    }
    const handleLogin = async () => {
        try {
            const data = await request('api/auth/login', 'POST', {...form})
           auth.login(data.token, data.userId)
        } catch (e) {
        }
    }

    const handleChandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h2>Скорати ссылку</h2>
                <div className="card blue-grey darken-1">

                    <div className="card-content white-text">
                        <span className="card-title">Войти в систему</span>
                        <div>
                            <div className="input-field ">
                                <input
                                    placeholder="Введите email"
                                    value={form.email}
                                    onChange={handleChandler}
                                    id="email"
                                    type="text"
                                    name='email'
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field ">
                                <input
                                    placeholder="Введите пароль"
                                    value={form.password}
                                    onChange={handleChandler}
                                    id="password"
                                    type="password"
                                    name='password'
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className='waves-effect waves-light btn mr1'
                            disabled={loading}
                            onClick={handleLogin}
                        >
                            Войти
                        </button>
                        <button
                            className='waves-effect waves-light btn'
                            disabled={loading}
                            onClick={handleRegister}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}