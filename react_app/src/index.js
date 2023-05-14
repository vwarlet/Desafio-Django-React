import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Comissao from './components/Comissao';
import Vendas from './components/Venda/Vendas';
import NovaVenda from './components/Venda/NovaVenda';
import EditarVenda from './components/Venda/EditarVenda';
import Clientes from './components/Cliente/Clientes';
import NovoCliente from './components/Cliente/NovoCliente';
import EditarCliente from './components/Cliente/EditarCliente';
import Vendedores from './components/Vendedor/Vendedores';
import NovoVendedor from './components/Vendedor/NovoVendedor';
import EditarVendedor from './components/Vendedor/EditarVendedor';
import Produtos from './components/Produto/Produtos';
import NovoProduto from './components/Produto/NovoProduto';
import EditarProduto from './components/Produto/EditarProduto';


ReactDOM.render(
  <Router>
    <NavBar />
    <Routes>
      <Route exact path="/" element={<Comissao />} />
      <Route path="/venda" element={<Vendas />} />
      <Route path="/nova-venda" element={<NovaVenda />} />
      <Route exact path="/venda/:id/editar" element={<EditarVenda />} />
      <Route path="/cliente" element={<Clientes />} />
      <Route path="/novo-cliente" element={<NovoCliente />} />
      <Route exact path="/cliente/:id/editar" element={<EditarCliente />} />
      <Route path="/vendedor" element={<Vendedores />} />
      <Route path="/novo-vendedor" element={<NovoVendedor />} />
      <Route exact path="/vendedor/:id/editar" element={<EditarVendedor />} />
      <Route path="/produto" element={<Produtos />} />
      <Route path="/novo-produto" element={<NovoProduto />} />
      <Route exact path="/produto/:id/editar" element={<EditarProduto />} />
    </Routes>
  </Router>,
  document.getElementById('app')
);
