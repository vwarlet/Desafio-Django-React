import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


interface Produto {
    id: number;
    codigo: string;
    descricao: string;
    valor: number;
    comissao: number;
}

const EditarProduto = () => {
    const { id } = useParams<{ id: string }>();
    const [produto, setProduto] = useState<Produto>({ id: 0, codigo: '', descricao: '', valor: 0, comissao: 0 });

    useEffect(() => {
        fetch(`/api/produtos/${id}/`)
            .then(response => response.json())
            .then(data => setProduto(data));
    }, [id]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(`/api/produtos/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
        alert('Produto alterado!')
        window.location.href = "http://localhost:8000/produto"
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduto({ ...produto, [event.target.name]: event.target.value });
    };

    return (
        <>
        <h1>Editar Produto</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Código:
                <input type="text" name="codigo" value={produto.codigo} onChange={handleChange} />
            </label>
            <label>
                Descrição:
                <input type="text" name="descricao" value={produto.descricao} onChange={handleChange} />
            </label>
            <label>
                Valor:
                <input type="text" name="valor" value={produto.valor} onChange={handleChange} />
            </label>
            <label>
                Comissao:
                <input type="text" name="comissao" value={produto.comissao} onChange={handleChange} />
            </label>
            <button type="submit">Atualizar</button>
        </form>
        </>
    );
};

export default EditarProduto;
