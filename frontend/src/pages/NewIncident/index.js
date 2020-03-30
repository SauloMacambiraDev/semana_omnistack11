import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import logoImg from './../../assets/logo.svg'
import './styles.css';

import api from './../../services/api'

export default function NewIncident() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState(0)

    const history = useHistory()

    const ongId = localStorage.getItem('ongId')
    // const ongName = localStorage.getItem('ongName')

    const newIncidentHandler = async (e) => {
        e.preventDefault()

        try {
            const data = {
                title,
                description,
                value
            }

            await api.post('/incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })

            alert(`Incident created successfully! `)
            history.push('/profile')
        } catch (err) {
            alert(`Was not possible to creat an Indicent. Please try again!`)
        }
    }


    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={newIncidentHandler}>
                    <input type="text"
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input type="text"
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

