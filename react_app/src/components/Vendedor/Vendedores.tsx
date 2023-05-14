import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


type Vendedor = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
};

const Vendedores = () => {
  const [vendedores, setVendedores] = useState<Vendedor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('api/vendedores')
      .then(response => response.json())
      .then(data => setVendedores(data));
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza de que deja excluir?"))
    {
        fetch(`api/vendedores/${id}`, { method: 'DELETE' })
            .then(() => setVendedores(vendedores.filter(vendedor => vendedor.id !== id)));
    }
  };

  const filteredVendedores = vendedores.filter((vendedor) => {
    return (
      vendedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendedor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendedor.telefone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <h1>Lista de Vendedores</h1>
      <h2><a href="/novo-vendedor">Cadastrar Vendedor</a></h2>
      <input type="text" placeholder="Buscar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendedores.map(vendedor => (
            <tr key={vendedor.id}>
              <td>{vendedor.nome}</td>
              <td>{vendedor.email}</td>
              <td>{vendedor.telefone}</td>
              <td>
                <Link to={`/vendedor/${vendedor.id}/editar`}><i className="fa fa-edit fa-lg"></i></Link>
                <Link to='/vendedor'><i className="fa fa-trash fa-lg" onClick={() => handleDelete(vendedor.id)}></i></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Vendedores;
