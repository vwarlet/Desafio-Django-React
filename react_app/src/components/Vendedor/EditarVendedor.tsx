import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


interface Vendedor {
    id: number;
    nome: string;
    email: string;
    telefone: string;
}

const EditarVendedor = () => {
    const { id } = useParams<{ id: string }>();
    const [vendedor, setVendedor] = useState<Vendedor>({ id: 0, nome: '', email: '', telefone: '' });

    useEffect(() => {
        fetch(`/api/vendedores/${id}/`)
            .then(response => response.json())
            .then(data => setVendedor(data));
    }, [id]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(`/api/vendedores/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vendedor)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
        alert('Vendedor alterado!')
        window.location.href = "http://localhost:8000/vendedor"
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVendedor({ ...vendedor, [event.target.name]: event.target.value });
    };

    return (
        <>
        <h1>Editar Vendedor</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input type="text" name="nome" value={vendedor.nome} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={vendedor.email} onChange={handleChange} />
            </label>
            <label>
                Telefone:
                <input type="tel" name="telefone" value={vendedor.telefone} onChange={handleChange} />
            </label>
            <button type="submit">Atualizar</button>
        </form>
        </>
    );
};

export default EditarVendedor;
