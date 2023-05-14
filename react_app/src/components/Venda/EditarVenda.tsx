import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


type ProdutoVendido = {
    id:number;
    codigo: string;
    descricao: string;
    valor: number;
    comissao: number;
    quantidade: number;
  };

type Venda = {
    id: number;
    nota_fiscal: string;
    cliente: string;
    vendedor: string;
    data: string;
    produtos_vendidos: ProdutoVendido[];
};


const EditarVenda = () => {
    const { id } = useParams<{ id: string }>();
    const [venda, setVenda] = useState<Venda>({ id: 0, nota_fiscal: '', cliente: '', vendedor: '', data: '', produtos_vendidos: [] });

    useEffect(() => {
        fetch(`/api/vendas/${id}/`)
            .then(response => response.json())
            .then(data => setVenda(data));
    }, [id]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(`/api/vendas/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venda)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
        alert('Venda alterada!')
        window.location.href = "http://localhost:8000/venda"
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVenda({ ...venda, [event.target.name]: event.target.value });
    };

    return (
        <>
        <h1>Editar Venda</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Nota Fiscal:
                <input type="text" name="nota_fiscal" value={venda.nota_fiscal} onChange={handleChange} />
            </label>
            <label>
                Cliente:
                <input type="text" name="cliente" value={venda.cliente} onChange={handleChange} />
            </label>
            <label>
                Vendedor:
                <input type="text" name="vendedor" value={venda.vendedor} onChange={handleChange} />
            </label>
            <label>
                Data:
                <input type="date" name="data" value={venda.data} onChange={handleChange} />
            </label>
            <button type="submit">Atualizar</button>
        </form>
        </>
    );
};

export default EditarVenda;
