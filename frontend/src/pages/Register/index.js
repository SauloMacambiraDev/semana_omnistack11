import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from './../../services/api'

import './styles.css'
import logoImg from './../../assets/logo.svg'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault()
        const data = {
            name,
            email,
            password,
            confirmPassword,
            whatsapp,
            city,
            uf
        }

        try {
            // axios already send data on JSON format by default
            const response = await api.post('/ongs', data)
            console.log('Response data coming from NodeJs API:')
            console.log(response.data)

            // alert(`Seu Id de acesso: ${response.data.id}`)
            alert(`Your account has been created successfully!`)
            history.push('/')
            // setName('')
            // setEmail('')
            // setWhatsapp('')
            // setCity('')
            // setUf('')
        } catch (err) {
            console.log(err)
            alert(`Erro ao tentar cadastrar ONG. Por favor, tente novamente`)
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para a tela de Login
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input type="text"
                        placeholder="Name of ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <input type="text"
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input type="text"
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input type="text"
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}