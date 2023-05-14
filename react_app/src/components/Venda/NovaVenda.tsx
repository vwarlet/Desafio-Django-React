import React, { useState, useEffect } from 'react';


type ProdutoVendido = {
    id:number;
    descricao: string;
    quantidade: number;
  };

type Cliente = {
    id: number;
    nome: string;
}

type Vendedor = {
    id: number;
    nome: string;
}

type Venda = {
    id: number;
    nota_fiscal: string;
    cliente: Cliente;
    vendedor: string;
    data: string;
    produtos_vendidos: ProdutoVendido[];
};


const Vendas = () => {
    const [vendas, setVendas] = useState<Venda[]>([]);
    const [nota_fiscal, setNotaFiscal] = useState<string>('');
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [vendedores, setVendedores] = useState<Vendedor[]>([]);
    const [data, setData] = useState<string>('');
    const [produtos, setProdutos] = useState<ProdutoVendido[]>([]);
    const [quantidade, setQuantidade] = useState<number>(0);


    useEffect(() => {
        fetch('api/clientes')
        .then(response => response.json())
        .then(data => setClientes(data));
        }, []);

    useEffect(() => {
        fetch('api/vendedores')
        .then(response => response.json())
        .then(data => setVendedores(data));
        }, []);

    useEffect(() => {
        fetch('api/produtos')
        .then(response => response.json())
        .then(data => setProdutos(data));
        }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const dataDict = { nota_fiscal, clientes, vendedores, data, produtos, quantidade };
        fetch('api/vendas/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataDict),
        })
        .then(response => response.json())
        .then(dataDict => setVendas([...vendas, dataDict]));
        alert('Venda adicionada!')
        window.location.href = "http://localhost:8000/venda"
        };


    return (
        <>
        <h1>Nova Venda</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Nota Fiscal:
                <input type="text" value={nota_fiscal} onChange={event => setNotaFiscal(event.target.value)} />
            </label>
            <label>
                Cliente:
                <select onChange={event => setClientes([...clientes, { id: parseInt(event.target.value), nome: event.target.value }])}>
                    {clientes.map(cliente => (
                        <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                    ))}
                </select>
            </label>
            <label>
                Vendedor:
                <select onChange={event => setVendedores([...vendedores, { id: parseInt(event.target.value), nome: event.target.value }])}>
                    {vendedores.map(vendedor => (
                        <option key={vendedor.id} value={vendedor.id}>{vendedor.nome}</option>
                    ))}
                </select>
            </label>
            <label>
                Data:
                <input type="date" value={data} onChange={event => setData(event.target.value)} />
            </label>
            <label>
                Produto:
                <select onChange={event => setProdutos([...produtos, { id: parseInt(event.target.value), descricao: event.target.value, quantidade: 0 }])}>
                    {produtos.map(produto => (
                        <option key={produto.id} value={produto.id}>{produto.descricao}</option>
                    ))}
                </select>
            </label>
            <label>
                Quantidade:
                <input type="number" value={quantidade} onChange={event => setQuantidade(event.target.valueAsNumber)} />
            </label>
            <button type="submit">Adicionar</button>
        </form>
        </>
    );
};

export default Vendas;
