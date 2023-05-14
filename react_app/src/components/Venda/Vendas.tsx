import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


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


const Vendas = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('api/vendas')
      .then(response => response.json())
      .then(data => setVendas(data));
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza de que deja excluir?"))
    {
        fetch(`api/clientes/${id}`, { method: 'DELETE' })
            .then(() => setVendas(vendas.filter(cliente => cliente.id !== id)));
    }
  };

  const filteredVendas = vendas.filter((venda) => {
    return (
      venda.nota_fiscal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venda.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venda.vendedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venda.data.includes(searchTerm)
    );
  });

  return (
    <>
      <h1>Vendas Realizadas</h1>
      <h2><a href="/nova-venda">Cadastrar Venda</a></h2>
      <input type="text" placeholder="Buscar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nota Fiscal</th>
            <th>Cliente</th>
            <th>Vendedor</th>
            <th>Data da Venda</th>
            <th>Valor Total</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendas.map(venda => (
            <tr key={venda.id}>
              <td>{venda.nota_fiscal}</td>
              <td>{venda.cliente}</td>
              <td>{venda.vendedor}</td>
              <td>{venda.data}</td>
              <td>R$ {venda.produtos_vendidos.map(pv => pv.valor * pv.quantidade).reduce((a, b) => a + b)}</td>
              <td>
                <a href="#" className='itens'>Ver itens</a>
                <Link to={`/venda/${venda.id}/editar`}><i className="fa fa-edit fa-lg"></i></Link>
                <Link to='/venda'><i className="fa fa-trash fa-lg" onClick={() => handleDelete(venda.id)}></i></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Vendas;
