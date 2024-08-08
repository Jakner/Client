import React, { useState, useEffect } from "react";
import Axios from "axios";
import Card from "../cards/card";
import { FaSearch, FaRedo, FaAngleUp } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import FixedEditButton from "./FixedEditButton";
import { format, parseISO, startOfWeek, endOfWeek, isWithinInterval, differenceInYears, getMonth } from "date-fns";

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
  });
  const [listGames, setListGames] = useState([]);
  const [filteredList, setFilteredList] = useState([]); // Estado para armazenar a lista filtrada

  function handleChangeValues(name, value) {
    setValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  const handleClickSearch = async () => {
    const nome = values.pesquisa;
    try {
      const { data } = await Axios.get(`https://server-mxrj.onrender.com/getCards/${nome}`);
      setFilteredList(data); // Atualize o estado com a lista filtrada
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }
  };

  // const handleClickButton = async () => {
  //   try {
  //     await Axios.post("https://server-mxrj.onrender.com/insert", values);
  //     const { data } = await Axios.get("https://server-mxrj.onrender.com/get");
  //     setListGames(data);
  //     setFilteredList(data); // Atualize o estado com a lista completa após inserção
  //     setValues({
  //       nome: '',
  //       data_nascimento: '',
  //       email: '',
  //       telefone: '',
  //       endereco: '',
  //       rg: '',
  //       cpf: '',
  //       matricula: '',
  //       vencimento: '',
  //       valor_mensalidade: '',
  //       pesquisa: '',
  //     });
  //   } catch (error) {
  //     console.error("Erro ao cadastrar item:", error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Axios.get('https://server-mxrj.onrender.com/get');
        setListGames(data);
        setFilteredList(data); // Inicialmente, a lista filtrada é igual à lista completa
      } catch (error) {
        console.error("Erro ao buscar todos os itens:", error);
      }
    };

    fetchData();
  }, []);

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
      {/* <div className="inserts">
        {["nome", "data_nascimento", "email", "telefone", "endereco", "rg", "cpf", "matricula", "vencimento", "valor_mensalidade"].map((field, idx) => (
          <input
            key={idx}
            type={field === "valor_mensalidade" ? "number" : "text"}
            name={field}
            placeholder={field.replace("_", " ").toUpperCase()}
            className="form-control"
            value={values[field]}
            onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
          />
        ))}
        <button className="btn btn-primary botao" onClick={handleClickButton}>
          Cadastrar
        </button>
      </div> */}

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
