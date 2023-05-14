import React, { useState, useEffect } from 'react';


type Cliente = {
    id: number;
    nome: string;
    email: string;
    telefone: string;
};

const Clientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = { nome, email, telefone };
        fetch('api/clientes/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => setClientes([...clientes, data]));
        alert('Cliente adicionado!')
        window.location.href = "http://localhost:8000/cliente"
    };

    return (
        <>
        <h1>Novo Cliente</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input type="text" value={nome} onChange={event => setNome(event.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
            </label>
            <label>
                Telefone:
                <input type="tel" value={telefone} onChange={event => setTelefone(event.target.value)} />
            </label>
            <button type="submit">Adicionar</button>
        </form>
        </>
    );
};

export default Clientes;
