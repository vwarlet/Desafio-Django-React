import React, { Component } from "react";
import { render } from "react-dom";


class Cliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch("api/clientes")
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
              <th>Ações</th>
            </tr>
          </thead>
          {this.state.data.map(clientes => {
            return (
              <tbody key={clientes.id}>
                <tr>
                  <td>{clientes.nome}</td>
                  <td>{clientes.email}</td>
                  <td>{clientes.telefone}</td>
                  <td>
                    <a href="/"><i class="fa fa-trash-o"></i></a>
                    <a href="/"><i class="fa fa-edit"></i></a>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}

export default Cliente;

const container = document.getElementById("api-clientes");
render(<Cliente />, container);
