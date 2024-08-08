import React from 'react';

export function Dashboard({ totalMensalidades, aniversariantesDoMes, vencimentosDaSemana }) {
  return (
    <div>
      <h3>Faturamento Mês: R$ {totalMensalidades.toFixed(2)}</h3>
      <h3>Aniversariantes do Mês:</h3>
      <ul>
        {aniversariantesDoMes.map((item) => (
          <li key={item.id}>
            {item.nome}: {format(parseISO(item.data_nascimento), 'dd/MM')}
          </li>
        ))}
      </ul>
      <h3>Vencimentos da Semana:</h3>
      <ul>
        {vencimentosDaSemana.map((item) => (
          <li key={item.id}>
            {item.nome} - DIA: {item.vencimento} - VALOR: {item.valor_mensalidade} - TEL: {item.telefone}
          </li>
        ))}
      </ul>
    </div>
  );
}