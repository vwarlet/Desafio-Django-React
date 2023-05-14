

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/">Comissao</a>
        </li>
        <li className="nav-item">
          <a href="/venda">Vendas</a>
        </li>
        <li className="nav-item">
          <a href="/cliente">Clientes</a>
        </li>
        <li className="nav-item">
          <a href="/vendedor">Vendedores</a>
        </li>
        <li className="nav-item">
          <a href="/produto">Produtos</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
