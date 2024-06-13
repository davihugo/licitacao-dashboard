import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Card from "./components/Cards";
import styled from 'styled-components';
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const HomeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 200px;
`;

const WelcomeMessage = styled.div`
  text-align: center;
  margin: 20px;
`;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function App() {
  const [licitacoes, setLicitacoes] = useState([]);
  const [filteredLicitacoes, setFilteredLicitacoes] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    axios
      .get("http://54.232.172.200:5004/list")
      .then((response) => {
        console.log("Dados recebidos:", response.data);
        setLicitacoes(response.data.res);
        setFilteredLicitacoes(response.data.res);
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  useEffect(() => {
    setStartDate("");
    setEndDate("");
    setStatus("");
    setFilteredLicitacoes(licitacoes);
  }, [activeSection, licitacoes]);

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const parseDate = (date) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleFilter = () => {
    let filtered = [];
    switch (activeSection) {
      case "buscar-valores-por-ano":
        filtered = licitacoes.filter((item) => {
          const ano = parseInt(item.EXERCICIO);
          return ano >= parseInt(startDate) && ano <= parseInt(endDate);
        });
        setStartDate("");
        setEndDate("");
        break;
      case "buscar-licitacoes-por-data":
        filtered = licitacoes.filter((item) => {
          const dataAbertura = new Date(item.DATA_ABERTURA);
          return (
            dataAbertura >= new Date(parseDate(startDate)) &&
            dataAbertura <= new Date(parseDate(endDate))
          );
        });
        break;
      case "buscar-status-licitacao":
        filtered = licitacoes.filter((item) => {
          const dataPublicacao = new Date(item.DATA_PUBLICACAO);
          return (
            item.STATUS_LICITACAO_NOME.includes(status) &&
            dataPublicacao >= new Date(parseDate(startDate)) &&
            dataPublicacao <= new Date(parseDate(endDate))
          );
        });
        break;
      default:
        filtered = licitacoes;
        break;
    }
    setFilteredLicitacoes(filtered);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setStartDate("");
    setEndDate("");
    setStatus("");
    setFilteredLicitacoes(licitacoes);
  };

  const totalLicitacoes = licitacoes.length;

  const secretariaMaisLicitacoes = licitacoes.reduce((acc, licitacao) => {
    const secretaria = licitacao.UNIDADE_NOME;
    if (!acc[secretaria]) {
      acc[secretaria] = 0;
    }
    acc[secretaria]++;
    return acc;
  }, {});

  const secretariaMaisLicitacoesNome = Object.keys(secretariaMaisLicitacoes).reduce((a, b) => secretariaMaisLicitacoes[a] > secretariaMaisLicitacoes[b] ? a : b, '');

  const valorMedioLicitacoes = (licitacoes.reduce((acc, licitacao) => acc + parseFloat(licitacao.VALOR_TOTAL_DESPESA), 0) / totalLicitacoes).toFixed(2);

  const statusPorcentagem = licitacoes.reduce((acc, licitacao) => {
    const status = licitacao.STATUS_LICITACAO_NOME;
    if (!acc[status]) {
      acc[status] = 0;
    }
    acc[status]++;
    return acc;
  }, {});

  const statusData = Object.keys(statusPorcentagem).map((status, index) => ({
    name: status,
    value: statusPorcentagem[status],
    fill: COLORS[index % COLORS.length]
  }));

  return (
    <div className="App" style={{ display: "flex" }}>
      <Sidebar setActiveSection={handleSectionChange} />
      <div style={{ width: "100%" }}>
        <Header />

        {activeSection === "home" && (
          <>
            <WelcomeMessage>
              <h1 className="home-title">Bem-vindo ao seu Dashboard!</h1>
              <p className="home-description">
                Aqui você pode visualizar e filtrar licitações de acordo com os
                critérios desejados. Use a barra lateral para navegar entre as
                seções.
              </p>
            </WelcomeMessage>
            <HomeContainer>
              <Card title="Número de Licitações" value={totalLicitacoes} />
              <Card title="Secretaria com Mais Licitações" value={secretariaMaisLicitacoesNome} />
              <Card title="Valor Médio das Licitações" value={`R$ ${valorMedioLicitacoes}`} />
              <Card title="Status das Licitações" value={
                <PieChart width={200} height={200}>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              } />
            </HomeContainer>
          </>
        )}

        {activeSection !== "home" && (
          <div className="filter-container">
            {activeSection === "buscar-valores-por-ano" && (
              <>
                <label>
                  Ano Inicial:
                  <input
                    type="number"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Ano inicial"
                  />
                </label>
                <label>
                  Ano Final:
                  <input
                    type="number"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="Ano final"
                  />
                </label>
              </>
            )}
            {(activeSection === "buscar-licitacoes-por-data" ||
              activeSection === "buscar-status-licitacao") && (
              <>
                <label>
                  Data Inicial:
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="dd/mm/yyyy"
                  />
                </label>
                <label>
                  Data Final:
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="dd/mm/yyyy"
                  />
                </label>
              </>
            )}
            {activeSection === "buscar-status-licitacao" && (
              <>
                <label>
                  Status:
                  <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="Status"
                  />
                </label>
              </>
            )}
            <button onClick={handleFilter}>Filtrar</button>
          </div>
        )}

        {filteredLicitacoes.length === 0 && activeSection !== "home" && (
          <div className="no-results">SEM RESULTADOS, TENTE NOVAMENTE</div>
        )}

        {activeSection !== "home" && (
          <Dashboard
            licitacoes={filteredLicitacoes.map((item) => ({
              ...item,
              DATA_PUBLICACAO: formatDate(item.DATA_PUBLICACAO),
              DATA_ABERTURA: formatDate(item.DATA_ABERTURA),
            }))}
            activeSection={activeSection}
          />
        )}
      </div>
    </div>
  );
}

export default App;
