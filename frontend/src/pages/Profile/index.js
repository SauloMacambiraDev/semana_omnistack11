import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import logoImg from './../../assets/logo.svg'

import './styles.css'

import api from './../../services/api'

export default function Profile() {
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')
    const [incidents, setIncidents] = useState([])

    const history = useHistory()

    // First parameter: Which function i want to be executed
    // Second parameter: When that function will be executed
    // Note: Second parameter is an array of dependencies
    useEffect(() => {

        const fetchData = async () => {
            try {

                const response = await api.get('/incidents', {
                    headers: {
                        Authorization: ongId
                    }
                })
                const { incidents: incidentsResponse } = response.data
                console.log(incidentsResponse)
                setIncidents(incidentsResponse)
                console.log(incidents)

            } catch (err) {
                alert('Some error ocurred while trying to fetch all incidents.')
            }

        }

        fetchData()

    }, [ongId]) //since the second parameter is an empty array, will be executed only once here in Profile Component

    const logoutHandler = e => {
        e.preventDefault()

        localStorage.clear()
        // localStorage.setItem('ongId', '')
        // localStorage.setItem('ongName', '')

        console.log('teste')
        history.push('/')
    }

    const deleteIncidentHandler = async id => {
        try {

            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert('Erro ao deletar caso. Tente novamente!')
        }
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo(a), {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button type="button" onClick={logoutHandler}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        {/* Intl a Javascript Global Class responsible for internalization */}
                        {/* 'currency' is the coin Format */}

                        {/* deleteIncidentHandler(incident.id) executes the function, so won't pass a function to onClick attribute */}
                        <button type="button" onClick={() => deleteIncidentHandler(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div >
    )
}