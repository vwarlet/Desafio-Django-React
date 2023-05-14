import React, { useState, useEffect } from 'react';


interface Produto {
    id: number;
    codigo: string;
    descricao: string;
    valor: number;
    comissao: number;
  }


const Produtos = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [codigo, setCodigo] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [valor, setValor] = useState<number>(0);
    const [comissao, setComissao] = useState<number>(0);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = { codigo, descricao, valor, comissao };
        fetch('api/produtos/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => setProdutos([...produtos, data]));
        alert('Produto adicionado!')
        window.location.href = "http://localhost:8000/produto"
    };

    return (
        <>
        <h1>Novo Produto</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input type="text" value={codigo} onChange={event => setCodigo(event.target.value)} />
            </label>
            <label>
                Descricao:
                <input type="text" value={descricao} onChange={event => setDescricao(event.target.value)} />
            </label>
            <label>
                Valor:
                <input type="number" value={valor} onChange={event => setValor(event.target.valueAsNumber)} />
            </label>
            <label>
                Comissao:
                <input type="number" value={comissao} onChange={event => setComissao(event.target.valueAsNumber)} />
            </label>
            <button type="submit">Adicionar</button>
        </form>
        </>
    );
};

export default Produtos;
