import React, { useState, useEffect } from "react";
import Axios from "axios";
import Card from "../cards/card";
import { FaSearch, FaRedo, FaAngleUp } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import FixedEditButton from "../button/FixedEditButton";
import { subDays, parseISO, startOfWeek, endOfWeek, isWithinInterval, differenceInYears, getMonth } from "date-fns";
import { useNavigate } from 'react-router-dom';

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

export default function HomeCrud() {
  const [values, setValues] = useState({
    nome: '',
    data_nascimento: '',
    email: '',
    telefone: '',
    endereco: '',
    rg: '',
    cpf: '',
    matricula: '',
    vencimento: '',
    valor_mensalidade: '',
    pesquisa: '',
    status_pagamento: false, // Adicionado campo de status de pagamento
  });
  const [listGames, setListGames] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const navigate = useNavigate();

  // Função para lidar com o pagamento
  const handlePaymentStatus = (item) => {
    return item.status_pagamento ? "Pago" : "Não Pago";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Axios.get('https://server-mxrj.onrender.com/get');
        setListGames(data);
        setFilteredList(data);
      } catch (error) {
        console.error("Erro ao buscar todos os itens:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Tempo para o logout automático em milissegundos (ex: 10 minutos)
    const logoutTime = 120 * 60 * 1000;

    const timer = setTimeout(() => {
      localStorage.clear();
      navigate('/'); // Redireciona para a página de login
      window.location.reload();
    }, logoutTime);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleChangeValues = (name, value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleClickSearch = async () => {
    const nome = values.pesquisa;
    try {
      const { data } = await Axios.get(`https://server-mxrj.onrender.com/getCards/${nome}`);
      setFilteredList(data);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }
  };

  const getDateFromDay = (dayString) => {
    const day = parseInt(dayString, 10);
    const today = new Date();
    return new Date(Date.UTC(today.getFullYear(), today.getMonth(), day));
  };

  const totalMensalidades = filteredList.reduce((acc, item) => acc + parseFloat(item.valor_mensalidade || 0), 0);

  const aniversariantesDoMes = filteredList.filter((item) => {
    if (!item.data_nascimento) return false;
    const dataNascimento = parseISO(item.data_nascimento);
    const mesNascimento = getMonth(dataNascimento);
    const mesAtual = getMonth(new Date());
    return mesNascimento === mesAtual;
  });

  const calcularIdade = (dataNascimento) => {
    const nascimento = parseISO(dataNascimento);
    const hoje = new Date();
    const idade = differenceInYears(hoje, nascimento);
    return idade;
  };

  const startOfWeekDate = startOfWeek(new Date());
  const endOfWeekDate = endOfWeek(new Date());

  const vencimentosDaSemana = filteredList.filter((item) => {
    if (!item.vencimento) return false;
    const dataVencimento = getDateFromDay(item.vencimento);
    return isWithinInterval(dataVencimento, { start: startOfWeekDate, end: endOfWeekDate });
  });

  const sair = () => {
    localStorage.clear();
    window.location.reload();
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `${match[1]}${match[2]}${match[3]}`;
    }
    return phoneNumber;
  };

  // Ajustar o critério para incluir alunos cujo vencimento passou nos últimos 30 dias
  const alunosAtivos = filteredList.filter(item => {
    if (!item.vencimento) return false;

    const dataVencimento = getDateFromDay(item.vencimento);
    const hoje = new Date();
    const limiteVencimento = subDays(hoje, 30); // Considera ativo até 30 dias após o vencimento

    return dataVencimento >= limiteVencimento;
  });

  const numeroAlunosAtivos = alunosAtivos.length;

  const totalAlunos = filteredList.length;

  return (
    <div className="content">
      <header className="py-3 mb-3 border-bottom">
        <div className="container-fluid d-grid gap-3 align-items-center header-display">
          <div className="container-fluid d-grid gap-3 align-items-center">
            <div className="d-flex align-items-center">
              <form onSubmit={(event) => { event.preventDefault() }} className="w-100 me-2">
                <div className="search">
                  <input
                    type="text"
                    name="pesquisa"
                    className="form-control pesquisar"
                    placeholder="Pesquisar..."
                    aria-label="Search"
                    value={values.pesquisa}
                    onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
                  />
                  <button
                    className="search-input"
                    onClick={handleClickSearch}
                  >
                    <FaSearch />
                  </button>
                  <button
                    className="search-input"
                    onClick={() => window.location.reload()}
                  >
                    <FaRedo />
                  </button>
                  <FixedEditButton listCard={filteredList} setListCard={setFilteredList} />
                  <button onClick={sair} className="exit">
                    <TbLogout />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
      <div className="dashboard">
        <h3 className="faturamento">Faturamento Mês: R$ {totalMensalidades.toFixed(2)}</h3>
        {/* Exibir número de alunos ativos */}
        {/* Exibir total de alunos */}
        <h3 className="total-alunos">Total de Alunos: {totalAlunos}</h3>
        <h3 className="alunos-ativos">Alunos Ativos: {numeroAlunosAtivos}</h3>
        <h3 className="aniversariantes">Aniversariantes do Mês:</h3>
        <ul>
          {aniversariantesDoMes.length > 0 ? (
            aniversariantesDoMes.map((item) => (
              <li key={item.id}>
                {item.nome}: {formatDate(item.data_nascimento)} - {calcularIdade(item.data_nascimento)} anos
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
                {item.nome} - DIA: {item.vencimento} - VALOR: {item.valor_mensalidade} - STATUS: <span className={`status ${item.status_pagamento ? 'pago' : 'nao-pago'}`}>
                  {handlePaymentStatus(item)}</span>  - TEL:
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

      {filteredList.length > 0 &&
        filteredList.map((value) => (
          <Card
            key={value.id}
            listCard={filteredList}
            setListCard={listGames}
            {...value}
          />
        ))}

      <a className="scroll" href="#top"><FaAngleUp /></a>
    </div>
  );
}
