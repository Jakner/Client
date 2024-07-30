import React, { useState, useEffect } from "react";
import Axios from "axios";
import Card from "../cards/card";
import { FaSearch, FaRedo } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

export default function HomeCrud() {
  // Atualize o estado para incluir os novos campos
  const [values, setValues] = useState({
    nome: '',
    dataNascimento: '',
    email: '',
    telefone: '',
    endereco: '',
    rg: '',
    cpf: '',
    matricula: '',
    valorMensalidade: '',
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
      await Axios.post("https://server-mxrj.onrender.com/insert", {
        nome: values.nome,
        dataNascimento: values.dataNascimento,
        email: values.email,
        telefone: values.telefone,
        endereco: values.endereco,
        rg: values.rg,
        cpf: values.cpf,
        matricula: values.matricula,
        valorMensalidade: values.valorMensalidade,
      });
      // Atualiza a lista de itens após inserção
      const { data } = await Axios.get("https://server-mxrj.onrender.com/get");
      setListGames(data);
      // Limpa os campos após a inserção
      setValues({
        nome: '',
        dataNascimento: '',
        email: '',
        telefone: '',
        endereco: '',
        rg: '',
        cpf: '',
        matricula: '',
        valorMensalidade: '',
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
                  <button
                    onClick={sair}
                    className="exit"
                  >
                    <TbLogout />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="inserts">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          className="form-control produto"
          value={values.nome}
          onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
        />

        <input
          type="date"
          name="dataNascimento"
          placeholder="Data de Nascimento"
          className="form-control"
          value={values.dataNascimento}
          onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control"
          value={values.email}
          onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
        />

        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          className="form-control"
          value={values.telefone}
          onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
        />

        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          className="form-control"
          value={values.endereco}
          onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
        />

        <input
          type="text"
          name="rg"
          placeholder="RG"
          className="form-control"
          value={values.rg}
          onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
        />

        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          className="form-control"
          value={values.cpf}
          onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
        />

        <input
          type="text"
          name="matricula"
          placeholder="Matrícula"
          className="form-control"
          value={values.matricula}
          onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
        />

        <input
          type="number"
          name="valorMensalidade"
          placeholder="Valor da Mensalidade"
          className="form-control"
          value={values.valorMensalidade}
          onChange={(event) => handleChangeValues(event.target.name, event.target.value)}
        />

        <button
          className="btn btn-primary botao"
          onClick={handleClickButton}
        >
          Cadastrar
        </button>
      </div>

      {listGames.length > 0 &&
        listGames.map((value) => (
          <Card
            key={value.id}
            listCard={listGames}
            setListCard={setListGames}
            id={value.iditems}
            name={value.name}
            cost={value.cost}
          />
        ))}

      <a className="scroll" href="#top"><FaAngleUp /></a>
    </div>
  );
}
