import React, { Component } from "react";
import { render } from "react-dom";


class Comissao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/comissao")
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
              <th>Data</th>
              <th>Valor mínimo %</th>
              <th>Valor máximo %</th>
              <th>Ações</th>
            </tr>
          </thead>
          {this.state.data.map(comissao => {
            return (
              <tbody key={comissao.id}>
                <tr>
                  <td>{comissao.data}</td>
                  <td>{comissao.minimo}</td>
                  <td>{comissao.maximo}</td>
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

export default Comissao;

const container = document.getElementById("api-comissao");
render(<Comissao />, container);
