import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


interface Cliente {
    id: number;
    nome: string;
    email: string;
    telefone: string;
}

const EditarCliente = () => {
    const { id } = useParams<{ id: string }>();
    const [cliente, setCliente] = useState<Cliente>({ id: 0, nome: '', email: '', telefone: '' });

    useEffect(() => {
        fetch(`/api/clientes/${id}/`)
            .then(response => response.json())
            .then(data => setCliente(data));
    }, [id]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(`/api/clientes/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
        alert('Cliente alterado!')
        window.location.href = "http://localhost:8000/cliente"
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCliente({ ...cliente, [event.target.name]: event.target.value });
    };

    return (
        <>
        <h1>Editar Cliente</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input type="text" name="nome" value={cliente.nome} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={cliente.email} onChange={handleChange} />
            </label>
            <label>
                Telefone:
                <input type="tel" name="telefone" value={cliente.telefone} onChange={handleChange} />
            </label>
            <button type="submit">Atualizar</button>
        </form>
        </>
    );
};

export default EditarCliente;
