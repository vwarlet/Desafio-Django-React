import React, { Component } from "react";
import { render } from "react-dom";


class Venda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/vendas")
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

  calculate_total(produtos){
    var sum = 0
    for(var i = 0; i < produtos.length; i++){
        sum += produtos[i].valor * produtos[i].quantidade
    }
    return sum
  }

  render() {
    return (
      <div>
        <table class="styled-table">
          <thead>
            <tr>
              <th>Nota Fiscal</th>
              <th>Data</th>
              <th>Cliente</th>
              <th>Vendedor</th>
              <th>Valor total dos produtos</th>
              <th>Total comissao</th>
              <th>Ações</th>
            </tr>
          </thead>
          {this.state.data.map(venda => {
            return (
              <tbody key={venda.id}>
                <tr>
                  <td>{venda.nota_fiscal}</td>
                  <td>{venda.data}</td>
                  <td>{venda.cliente}</td>
                  <td>{venda.vendedor}</td>
                  <td>R${this.calculate_total(venda.produtos_vendidos)}</td>
                  <td>{venda.total_comissao}%</td>
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

export default Venda;

const container = document.getElementById("api-venda");
render(<Venda />, container);
