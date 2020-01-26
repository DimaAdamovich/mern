import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom'

export const CreatePage = () =>{
    const history = useHistory()
    const [link, setLink] = useState('')
    const {token} = useContext(AuthContext)
    const {request} = useHttp()

    const handleChandler = event => {
        setLink(event.target.value)
    }
    const pressHandler = async event => {
        if(event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${token}`})
                history.push(`/details/${data.link._id}`)
            }catch (e) {}
        }
    }

    useEffect(() =>{
        window.M.updateTextFields()
    }, [])
    return(
        <div className='row m2auto'>
            <div className="col s8 offset-s2">
                <div className="input-field ">
                    <input
                        placeholder="Введите ссылку"
                        value={link}
                        onChange={handleChandler}
                        onKeyPress={pressHandler}
                        id='link'
                        type="text"
                        name='link'
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}

export class DetailsPage {
}