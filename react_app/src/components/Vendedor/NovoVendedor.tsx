import React, { useState, useEffect } from 'react';


type Vendedor = {
    id: number;
    nome: string;
    email: string;
    telefone: string;
};

const Vendedores = () => {
    const [vendedores, setVendedores] = useState<Vendedor[]>([]);
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = { nome, email, telefone };
        fetch('api/vendedores/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => setVendedores([...vendedores, data]));
        alert('Vendedor adicionado!')
        window.location.href = "http://localhost:8000/vendedor"
    };

    return (
        <>
        <h1>Novo Vendedor</h1>
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

export default Vendedores;
