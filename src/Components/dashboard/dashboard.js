import React from 'react';
import { format, parseISO, differenceInYears } from "date-fns";

const calcularIdade = (dataNascimento) => {
  const nascimento = parseISO(dataNascimento);
  const hoje = new Date();
  const idade = differenceInYears(hoje, nascimento);
  return idade;
};

const formatPhoneNumber = (phoneNumber) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  if (match) {
    return `${match[1]}${match[2]}${match[3]}`;
  }
  return phoneNumber;
};


export function Dashboard({ totalMensalidades, aniversariantesDoMes, vencimentosDaSemana }) {
  return (
    <div className="dashboard">
    <h3 className="faturamento">Faturamento Mês: R$ {totalMensalidades.toFixed(2)}</h3>
    <h3 className="aniversariantes">Aniversariantes do Mês:</h3>
    <ul>
      {aniversariantesDoMes.length > 0 ? (
        aniversariantesDoMes.map((item) => (
          <li key={item.id}>
            {item.nome}: {format(parseISO(item.data_nascimento), 'dd/MM')} - {calcularIdade(item.data_nascimento)} anos
          </li>
        ))
      ) : (
        <li>Nenhum aniversariante encontrado.</li>
      )}
    </ul>
    <h3 className="vencimentos">Vencimentos da Semana:</h3>
    <ul>
      {vencimentosDaSemana.length > 0 ? (
        vencimentosDaSemana.map((item) => (
          <li key={item.id}>
            {item.nome} - DIA: {item.vencimento} - VALOR: {item.valor_mensalidade} - TEL: 
            <a href={`https://wa.me/55${formatPhoneNumber(item.telefone)}`} target="_blank" rel="noopener noreferrer"> 
            {item.telefone}
            </a>
          </li>
        ))
      ) : (
        <li>Nenhum vencimento encontrado para esta semana.</li>
      )}
    </ul>
  </div>
  );
}