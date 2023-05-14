import React, { useState, useEffect } from 'react';


type Comissao = {
  id: number;
  dia_semana: string;
  minimo: number;
  maximo: number;
};

type Venda = {
  id: number;
  data: string;
  valor: number;
};

const Comissao = () => {
  const [Comissao, setComissaos] = useState<Comissao[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    fetch('api/comissao')
      .then(response => response.json())
      .then(data => setComissaos(data));
  }, []);

  useEffect(() => {
    fetch('api/vendas')
      .then(response => response.json())
      .then(data => setVendas(data));
  }, []);

  const handleSearch = (startDate: string, endDate: string) => {
    const filteredVendas = vendas.filter(venda => venda.data >= startDate && venda.data <= endDate);
    setVendas(filteredVendas);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowTable(true);
    };

  return (
    <>
      <h1>Tabela de limites de comissão por dia da semana</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Dia da Semana</th>
            <th>Mínimo</th>
            <th>Máximo</th>
          </tr>
        </thead>
        <tbody>
          {Comissao.map(comissao => (
            <tr key={comissao.id}>
              <td>{comissao.dia_semana}</td>
              <td>{comissao.minimo}%</td>
              <td>{comissao.maximo}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Escolha o período das vendas</h1>
      <form onSubmit={handleSubmit}>
        <label>Data Inicial</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label>Data Final</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>
      {showTable && (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map(venda => (
              <tr key={venda.id}>
                <td>{venda.data}</td>
                <td>{venda.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Comissao;
