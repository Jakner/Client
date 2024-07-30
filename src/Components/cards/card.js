import React, { useState } from "react";
import FormDialog from "../dialog/dialog";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import '../../Styles/Card_homeCrud.css';
import Axios from "axios";

export default function Card(props) {
  const [open, setOpen] = React.useState(false);

  // Abre o modal de edição
  const handleClickCard = () => {
    setOpen(true);
  };

  // Estado para os valores de edição
  const [editValues] = useState({
    id: props.id,
    nome: props.nome,
    dataNascimento: props.dataNascimento,
    email: props.email,
    telefone: props.telefone,
    endereco: props.endereco,
    rg: props.rg,
    cpf: props.cpf,
    matricula: props.matricula,
    valorMensalidade: props.valorMensalidade,
  });

  // Função para deletar o item
  const handleDeleteGame = async () => {
    try {
      await Axios.delete(`https://server-mxrj.onrender.com/delete/${editValues.id}`);
      // Atualiza a lista após exclusão
      props.setListCard(props.listCard.filter(item => item.id !== editValues.id));
    } catch (err) {
      console.error("Erro ao deletar item:", err);
    }
  };

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        nome={props.nome}
        dataNascimento={props.dataNascimento}
        email={props.email}
        telefone={props.telefone}
        endereco={props.endereco}
        rg={props.rg}
        cpf={props.cpf}
        matricula={props.matricula}
        valorMensalidade={props.valorMensalidade}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id} 
      />

      <div className="main">
        <table className="table">
          <thead className="table">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Data Nascimento</th>
              <th scope="col">Email</th>
              <th scope="col">Telefone</th>
              <th scope="col">Endereço</th>
              <th scope="col">RG</th>
              <th scope="col">CPF</th>
              <th scope="col">Matrícula</th>
              <th scope="col">Valor Mensalidade</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            <tr className='linha-prod'>
              <th scope="row">{props.id}</th>
              <td>{props.nome}</td>
              <td>{props.dataNascimento}</td>
              <td>{props.email}</td>
              <td>{props.telefone}</td>
              <td>{props.endereco}</td>
              <td>{props.rg}</td>
              <td>{props.cpf}</td>
              <td>{props.matricula}</td>
              <td>{props.valorMensalidade}</td>
              <td className="btn-func">
                <button
                  type="button"
                  className="btn btn-primary edit"
                  onClick={handleClickCard}
                >
                  Editar <FaEdit />
                </button>
                <button
                  type="button"
                  onClick={handleDeleteGame}
                  className="btn btn-primary del"
                >
                  Excluir <FaTrashAlt />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
