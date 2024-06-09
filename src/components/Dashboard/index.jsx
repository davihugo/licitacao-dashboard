import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {
  DashboardContainer,
  ContentWrapper,
  DashboardContent,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  PaginationContainer,
  PaginationButton,
  PageInfo
} from "./styles";

const Dashboard = ({ licitacoes, activeSection }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  const totalPages = Math.ceil(licitacoes.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = licitacoes.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <DashboardContainer>
      <ContentWrapper>
        <DashboardContent>
          {activeSection === 'buscar-valores-por-ano' && (
            <>
              <h2>Soma de Valores por Ano</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={somaData}>
                  <XAxis dataKey='ano' />
                  <YAxis tickFormatter={formatYAxis} />
                  <Tooltip formatter={(value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)} />
                  <Legend />
                  <Bar dataKey='total' fill='#176848' />
                </BarChart>
              </ResponsiveContainer>
              <h2>Quantidade de Licitações por Unidade</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
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
              </ResponsiveContainer>
            </>
          )}
          {activeSection === 'buscar-status-licitacao' && (
            <>
              <h2>Status das Licitações</h2>
              <ResponsiveContainer width="100%" height={450}>
                <BarChart data={statusData}>
                  <XAxis dataKey='status' hide />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar name='Quantidade' dataKey='quantidade' fill='#176848' />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
          {activeSection === 'buscar-licitacoes-por-data' && (
            <>
              <h2>Resultados da Busca por Data</h2>
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <TableHeader>Numero Processo</TableHeader>
                      <TableHeader>Objeto</TableHeader>
                      <TableHeader>Valor</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((licitacao) => (
                      <tr key={licitacao.NUMERO_PROCESSO}>
                        <TableCell>{licitacao.NUMERO_PROCESSO}</TableCell>
                        <TableCell>{licitacao.OBJETO}</TableCell>
                        <TableCell>{licitacao.VALOR_TOTAL_DESPESA}</TableCell>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
              {licitacoes.length > itemsPerPage && (
                <PaginationContainer>
                  <PaginationButton onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Anterior
                  </PaginationButton>
                  <PageInfo> Página {currentPage} de {totalPages} </PageInfo>
                  <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Próxima
                  </PaginationButton>
                </PaginationContainer>
              )}
            </>
          )}
        </DashboardContent>
      </ContentWrapper>
    </DashboardContainer>
  );
};

export default Dashboard;
