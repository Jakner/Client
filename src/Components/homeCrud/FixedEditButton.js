// Component for the fixed edit button
import React, { useState } from "react";
import FormDialogadd from "../dialog/dialogadd";
import { FaEdit } from "react-icons/fa";
import '../../Styles/Card_homeCrud.css';


function FixedEditButton(props) {
  const [open, setOpen] = useState(false);

  const handleClickEdit = () => {
    setOpen(true);
  };

  return (
    <>
      <FormDialogadd
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
        valor_mensalidade={props.valor_mensalidade}
        id={props.id}
      />
      <button
        className="btn btn-primary botao"
        onClick={handleClickEdit}
      >
        Cadastrar Aluno <FaEdit />
      </button>
    </>
  );
}

export default FixedEditButton;