import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


interface Produto {
  id: number;
  codigo: string;
  descricao: string;
  valor: number;
  comissao: number;
}

const Produtos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('api/produtos')
      .then(response => response.json())
      .then(data => setProdutos(data));
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza de que deja excluir?"))
    {
        fetch(`api/produtos/${id}`, { method: 'DELETE' })
            .then(() => setProdutos(produtos.filter(produto => produto.id !== id)));
    }
  };

  const filteredClientes = produtos.filter((produto) => {
    return (
      produto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <h1>Lista de Produtos</h1>
      <h2><a href="/novo-produto">Cadastrar Produto</a></h2>
      <input type="text" placeholder="Buscar por código ou descrição" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <table className="styled-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Comissão</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.map(produto => (
            <tr key={produto.id}>
              <td>{produto.codigo}</td>
              <td>{produto.descricao}</td>
              <td>R$ {produto.valor}</td>
              <td>{produto.comissao}%</td>
              <td>
                <Link to={`/produto/${produto.id}/editar`}><i className="fa fa-edit fa-lg"></i></Link>
                <Link to='/produto'><i className="fa fa-trash fa-lg" onClick={() => handleDelete(produto.id)}></i></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Produtos;
