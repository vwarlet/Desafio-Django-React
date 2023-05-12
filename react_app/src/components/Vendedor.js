import React, { Component } from "react";
import { render } from "react-dom";


class Vendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch("api/vendedores")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

  render() {
    return (
      <div>
        <table class="styled-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Vendedor</th>
            </tr>
          </thead>
          {this.state.data.map(vendedores => {
            return (
              <tbody key={vendedores.id}>
                <tr>
                  <td>{vendedores.nome}</td>
                  <td>{vendedores.email}</td>
                  <td>{vendedores.telefone}</td>
                  <td><a href="clientes"><i class="fa fa-trash-o"></i></a></td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}

export default Vendedor;

const container = document.getElementById("api-vendedores");
render(<Vendedor />, container);
