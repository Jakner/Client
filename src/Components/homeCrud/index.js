import React, { useState, useEffect } from "react";
import Axios from "axios";
import Card from "../cards/card";
import { FaSearch, FaRedo, FaAngleUp } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import FixedEditButton from "./FixedEditButton";
import { format } from "date-fns";

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

  // Função para atualizar valores
  function handleChangeValues(name, value) {
    setValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  // Função para buscar itens
  const handleClickSearch = async () => {
    const nome = values.pesquisa;
    try {
      const { data } = await Axios.get(`https://server-mxrj.onrender.com/getCards/${nome}`);
      setListGames(data);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }
  };

  // Função para cadastrar produto
  const handleClickButton = async () => {
    try {
      await Axios.post("https://server-mxrj.onrender.com/insert", values);
      // Atualiza a lista de itens após inserção
      const { data } = await Axios.get("https://server-mxrj.onrender.com/get");
      setListGames(data);
      // Limpa os campos após a inserção
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

  // Efeito para buscar todos os itens ao montar o componente
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

  // Cálculo do valor total das mensalidades
  const totalMensalidades = listGames.reduce((acc, item) => acc + parseFloat(item.valor_mensalidade), 0);

  // Função para sair e limpar localStorage
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
        {/* Inputs para os dados dos alunos */}
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
        <h3>Datas de Vencimento e Aniversário:</h3>
        <ul>
          {listGames.map((item) => (
            <li key={item.id}>
              {item.nome}: Vencimento - {item.vencimento}, Aniversário - {format(new Date(item.data_nascimento), 'dd/MM/yyyy')}
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
