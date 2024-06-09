import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

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

  const handleFilter = () => {
    let filtered = [];
    switch (activeSection) {
      case "buscar-valores-por-ano":
        filtered = licitacoes.filter((item) => {
          const ano = parseInt(item.EXERCICIO);
          return ano >= parseInt(startDate) && ano <= parseInt(endDate);
        });
        break;
      case "buscar-licitacoes-por-data":
        filtered = licitacoes.filter((item) => {
          const dataAbertura = new Date(item.DATA_ABERTURA);
          return (
            dataAbertura >= new Date(startDate) &&
            dataAbertura <= new Date(endDate)
          );
        });
        break;
      case "buscar-status-licitacao":
        filtered = licitacoes.filter((item) => {
          const dataPublicacao = new Date(item.DATA_PUBLICACAO);
          return (
            item.STATUS_LICITACAO_NOME.includes(status) &&
            dataPublicacao >= new Date(startDate) &&
            dataPublicacao <= new Date(endDate)
          );
        });
        break;
      default:
        filtered = licitacoes;
        break;
    }
    setFilteredLicitacoes(filtered);
    setStartDate("");
    setEndDate("");
    setStatus("");
  };

  return (
    <div className="App" style={{ display: "flex" }}>
      <Sidebar setActiveSection={setActiveSection} />
      <div style={{ marginLeft: "300px", width: "100%" }}>
        <Header />

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
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </label>
                <label>
                  Data Final:
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
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

        {activeSection === "home" && (
          <div className="home-container">
            <h1 className="home-title">Bem-vindo ao seu Dashboard!</h1>
            <p className="home-description">
              Aqui você pode visualizar e filtrar licitações de acordo com os
              critérios desejados. Use a barra lateral para navegar entre as
              seções.
            </p>
          </div>
        )}

        {filteredLicitacoes.length === 0 && activeSection !== "home" && (
          <div className="no-results">SEM RESULTADOS, TENTE NOVAMENTE</div>
        )}

        <Dashboard
          licitacoes={filteredLicitacoes}
          activeSection={activeSection}
        />
      </div>
    </div>
  );
}

export default App;
