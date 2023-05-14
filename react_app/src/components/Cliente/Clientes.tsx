import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


type Cliente = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
};

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('api/clientes')
      .then(response => response.json())
      .then(data => setClientes(data));
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza de que deja excluir?"))
    {
        fetch(`api/clientes/${id}`, { method: 'DELETE' })
            .then(() => setClientes(clientes.filter(cliente => cliente.id !== id)));
    }
  };

  const filteredClientes = clientes.filter((cliente) => {
    return (
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <h1>Lista de Clientes</h1>
      <h2><a href="/novo-cliente">Cadastrar Cliente</a></h2>
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
          {filteredClientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>
                <Link to={`/cliente/${cliente.id}/editar`}><i className="fa fa-edit fa-lg"></i></Link>
                <Link to='/cliente'><i className="fa fa-trash fa-lg" onClick={() => handleDelete(cliente.id)}></i></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Clientes;
