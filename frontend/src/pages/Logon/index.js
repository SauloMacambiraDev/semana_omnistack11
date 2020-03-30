import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi' //fi = feather icons. Visit: https://feathericons.com/
import './styles.css'

import heroesImg from './../../assets/heroes.png'
import logoImg from './../../assets/logo.svg'

import api from './../../services/api'

export default function Logon() {
    const [ongId, setOngId] = useState('')

    const history = useHistory()

    const loginHandler = async e => {
        e.preventDefault()

        try {
            const response = await api.post('/ongs/session', { id: ongId })

            // Salva em cash no navegador
            localStorage.setItem('ongId', ongId)
            localStorage.setItem('ongName', response.data.ong.name)

            history.push('/profile')
        } catch (err) {
            console.log(err.message)
            alert(`Was not possible to log in. Please try again`)
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero" />
                <form onSubmit={loginHandler}>
                    <h1>Faça seu logon</h1>
                    <input type="text"
                        placeholder="Your ID"
                        value={ongId}
                        onChange={e => setOngId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    {/* <a href=""></a> not a good practice since this is a feature from html. */}
                    {/* So, when calling an hypertext link HTML ('a' tag), will make the entire react app reload from the /register router*/}
                    {/* And since we work with SPA, we want to avoid it. This is why we use 'Link' */}
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div >
    )
}