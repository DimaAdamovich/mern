import React, {useCallback, useContext, useEffect, useState} from "react";
import {useAuth} from "../hooks/auth.hook";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";
import {LinksList} from "../components/LinksList";

export const LinksPage = () => {
    const {token} = useContext(AuthContext)
    const {loading, request} = useHttp()
    const [links, setLinks] = useState([])

    const getLinks = useCallback(async () => {
        try {
            const data = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(data)

        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        getLinks()
    }, [getLinks])
    if (loading) {
        return <Loader/>
    }
    return (
        links.length
            ? <LinksList links={links}/>
            : <h2>У вас нет ссылок</h2>
    )
}