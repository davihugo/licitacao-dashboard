import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { DashboardContainer, ContentWrapper, DashboardContent } from "./styles";

const Dashboard = ({ licitacoes, activeSection }) => {
  useEffect(() => {
    console.log('Licitacoes recebidas:', licitacoes);
  }, [licitacoes]);

  if (!licitacoes || licitacoes.length === 0) {
    return <div>Carregando...</div>;
  }

  const somaValoresPorAno = licitacoes.reduce((acc, licitacao) => {
    const ano = licitacao.EXERCICIO;
    const valor = parseFloat(licitacao.VALOR_TOTAL_DESPESA);
    if (!acc[ano]) {
      acc[ano] = 0;
    }
    if (!isNaN(valor)) {
      acc[ano] += valor;
    }
    return acc;
  }, {});

  const statusPorAno = licitacoes.reduce((acc, licitacao) => {
    const status = licitacao.STATUS_LICITACAO_NOME;
    if (!acc[status]) {
      acc[status] = 0;
    }
    acc[status] += 1;
    return acc;
  }, {});

  const licitacoesPorUnidade = licitacoes.reduce((acc, licitacao) => {
    const unidade = licitacao.UNIDADE_NOME;
    if (!acc[unidade]) {
      acc[unidade] = 0;
    }
    acc[unidade] += 1;
    return acc;
  }, {});

  const somaData = Object.keys(somaValoresPorAno).map((ano) => ({
    ano,
    total: somaValoresPorAno[ano],
  }));

  const statusData = Object.keys(statusPorAno).map((status) => ({
    status,
    quantidade: statusPorAno[status],
  }));

  const unidadeData = Object.keys(licitacoesPorUnidade).map((unidade) => ({
    unidade,
    quantidade: licitacoesPorUnidade[unidade],
  }));

  const formatYAxis = (tickItem) => {
    if (tickItem >= 1000000) {
      return `${(tickItem / 1000000).toFixed(1)}M`;
    }
    if (tickItem >= 1000) {
      return `${(tickItem / 1000).toFixed(1)}K`;
    }
    return tickItem;
  };

  return (
    <DashboardContainer>
      <ContentWrapper>
        <DashboardContent>
          {activeSection === 'buscar-valores-por-ano' && (
            <>
              <h2>Soma de Valores por Ano</h2>
              <BarChart width={600} height={300} data={somaData}>
                <XAxis dataKey='ano' />
                <YAxis tickFormatter={formatYAxis} />
                <Tooltip formatter={(value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)} />
                <Legend />
                <Bar dataKey='total' fill='#176848' />
              </BarChart>
              <h2>Quantidade de Licitações por Unidade</h2>
              <PieChart width={600} height={300}>
                <Pie
                  data={unidadeData}
                  dataKey='quantidade'
                  nameKey='unidade'
                  cx='50%'
                  cy='50%'
                  outerRadius={100}
                  fill='#5225AF'
                  label
                />
                <Tooltip />
              </PieChart>
            </>
          )}
          {activeSection === 'buscar-status-licitacao' && (
            <>
              <h2>Status das Licitações</h2>
              <BarChart width={1500} height={450} data={statusData}>
                <XAxis dataKey='status' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar name='Quantidade' dataKey='quantidade' fill='#176848' />
              </BarChart>
            </>
          )}
          {activeSection === 'buscar-licitacoes-por-data' && (
            <>
              <h2>Resultados da Busca por Data</h2>
              <table style = {{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Numero Processo</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Objeto</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {licitacoes.map((licitacao) => (
                    <tr key={licitacao.NUMERO_PROCESSO}>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{licitacao.NUMERO_PROCESSO}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{licitacao.OBJETO}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{licitacao.VALOR_TOTAL_DESPESA}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </DashboardContent>
      </ContentWrapper>
    </DashboardContainer>
  );
};

export default Dashboard;
