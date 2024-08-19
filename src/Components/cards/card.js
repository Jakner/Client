import React, { useState } from "react";
import FormDialog from "../dialog/dialog";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import '../../Styles/Card_homeCrud.css';
import '../../Styles/table.css';
import Axios from "axios";

// Função para formatar a data
const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

// Função para formatar o CPF
const formatCPF = (cpf) => {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};


export default function Card(props) {
  const [open, setOpen] = useState(false);

  // Abre o modal de edição
  const handleClickCard = () => {
    setOpen(true);
  };

  // Estado para os valores de edição
  const [editValues] = useState({
    id: props.id,
    nome: props.nome,
    data_nascimento: props.data_nascimento,
    email: props.email,
    telefone: props.telefone,
    endereco: props.endereco,
    rg: props.rg,
    cpf: props.cpf,
    matricula: props.matricula,
    vencimento: props.vencimento,
    valor_mensalidade: props.valor_mensalidade,
  });

  // Função para deletar o item
  const handleDeleteGame = async () => {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o item "${props.nome}"?`);
    if (confirmDelete) {
      try {
        await Axios.delete(`https://server-mxrj.onrender.com/delete/${editValues.id}`);
        // Atualiza a lista após exclusão
        props.setListCard(props.listCard.filter(item => item.id !== editValues.id));
      } catch (err) {
        console.error("Erro ao deletar item:", err);
      }
    }
  };

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        nome={props.nome}
        data_nascimento={props.data_nascimento}
        email={props.email}
        telefone={props.telefone}
        endereco={props.endereco}
        rg={props.rg}
        cpf={props.cpf}
        matricula={props.matricula}
        vencimento={props.vencimento}
        valor_mensalidade={props.valor_mensalidade}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id} 
      />

      <div className="table-container">
        <div className="table-header">
          <div className="table-header-cell">ID</div>
          <div className="table-cell">{props.id}</div>
          <div className="table-header-cell">Nome</div>
          <div className="table-cell">{props.nome}</div>
          <div className="table-header-cell">Data Nascimento</div>
          <div className="table-cell">{formatDate(props.data_nascimento)}</div> {/* Formatação da data */}
          <div className="table-header-cell">Email</div>
          <div className="table-cell">{props.email}</div>
          <div className="table-header-cell">Telefone</div>
          <div className="table-cell">{props.telefone}</div>
          <div className="table-header-cell">Endereço</div>
          <div className="table-cell">{props.endereco}</div>
          <div className="table-header-cell">RG</div>
          <div className="table-cell">{props.rg}</div>
          <div className="table-header-cell">CPF</div>
          <div className="table-cell">{formatCPF(props.cpf)}</div>
          <div className="table-header-cell">Matrícula</div>
          <div className="table-cell">{props.matricula}</div>
          <div className="table-header-cell">Valor vencimento</div>
          <div className="table-cell">{props.vencimento}</div>
          <div className="table-header-cell">Valor Mensalidade</div>
          <div className="table-cell">{props.valor_mensalidade}</div>
          <div className="table-header-cell">Ações</div>
          <div className="table-cell table-actions">
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
          </div>
        </div>

        <div className="table-row">
          <div className="table-cell">{props.id}</div>
          <div className="table-cell">{props.nome}</div>
          <div className="table-cell">{formatDate(props.data_nascimento)}</div> {/* Formatação da data */}
          <div className="table-cell">{props.email}</div>
          <div className="table-cell">{props.telefone}</div>
          <div className="table-cell">{props.endereco}</div>
          <div className="table-cell">{props.rg}</div>
          <div className="table-cell">{formatCPF(props.cpf)}</div>
          <div className="table-cell">{props.matricula}</div>
          <div className="table-cell">{props.vencimento}</div>
          <div className="table-cell">{props.valor_mensalidade}</div>
          <div className="table-cell table-actions">
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
          </div>
        </div>
      </div>
    </>
  );
}
