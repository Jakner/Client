import React, { useState, useEffect } from "react";
import Axios from "axios";
import Card from "../cards/card";
import { FaSearch, FaRedo, FaAngleUp } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import FixedEditButton from "./FixedEditButton";
import { format, isSameMonth, parseISO, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

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
      setListGames(data);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }
  };

  const handleClickButton = async () => {
    try {
      await Axios.post("https://server-mxrj.onrender.com/insert", values);
      const { data } = await Axios.get("https://server-mxrj.onrender.com/get");
      setListGames(data);
      setValues({
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
    } catch (error) {
      console.error("Erro ao cadastrar item:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Axios.get('https://server-mxrj.onrender.com/get');
        setListGames(data);
      } catch (error) {
        console.error("Erro ao buscar todos os itens:", error);
      }
    };

    fetchData();
  }, []);

  const getDateFromDay = (dayString) => {
    const day = parseInt(dayString, 10);
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), day);
  };

  const totalMensalidades = listGames.reduce((acc, item) => acc + parseFloat(item.valor_mensalidade), 0);

  const aniversariantesDoMes = listGames.filter((item) =>
    isSameMonth(parseISO(item.data_nascimento), new Date())
  );

  const startOfWeekDate = startOfWeek(new Date());
  const endOfWeekDate = endOfWeek(new Date());

  // Cálculo para encontrar as datas de vencimento da semana corrente
  const vencimentosDaSemana = listGames.filter((item) => {
    if (!item.vencimento) return false; // Ignorar se não houver informação de vencimento
    const dataVencimento = getDateFromDay(item.vencimento);
    return isWithinInterval(dataVencimento, { start: startOfWeekDate, end: endOfWeekDate });
  });

  const sair = () => {
    localStorage.clear();
    window.location.reload();
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
                  <FixedEditButton listCard={listGames} setListCard={setListGames} />
                  <button onClick={sair} className="exit">
                    <TbLogout />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="inserts">
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
      </div>

      <div className="dashboard">
        <h3>Valor Total das Mensalidades: R$ {totalMensalidades.toFixed(2)}</h3>
        <h3>Aniversariantes do Mês:</h3>
        <ul>
          {aniversariantesDoMes.map((item) => (
            <li key={item.id}>
              {item.nome}: {format(parseISO(item.data_nascimento), 'yyyy-mm-dd')}
            </li>
          ))}
        </ul>
        <h3>Vencimentos da Semana:</h3>
        <ul>
          {vencimentosDaSemana.map((item) => (
            <li key={item.id}>
              {item.nome} - {item.vencimento} - {item.valor_mensalidade} - Tel - {item.telefone}
            </li>
          ))}
        </ul>
      </div>

      {listGames.length > 0 &&
        listGames.map((value) => (
          <Card
            key={value.id}
            listCard={listGames}
            setListCard={setListGames}
            {...value}
          />
        ))}

      <a className="scroll" href="#top"><FaAngleUp /></a>
    </div>
  );
}
