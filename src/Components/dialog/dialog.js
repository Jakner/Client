import React,{useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
    const [editValues, setEditValues] = useState({
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
        status_pagamento: props.status_pagamento || false, // Adiciona o campo status_pagamento
    });

    const handleEditGame = async () => {
        await Axios.put("https://server-mxrj.onrender.com/edit", {
            id: editValues.id,
            nome: editValues.nome,
            data_nascimento: editValues.data_nascimento,
            email: editValues.email,
            telefone: editValues.telefone,
            endereco: editValues.endereco,
            rg: editValues.rg,
            cpf: editValues.cpf,
            matricula: editValues.matricula,
            vencimento: editValues.vencimento,
            valor_mensalidade: editValues.valor_mensalidade,
            status_pagamento: editValues.status_pagamento, // Inclui na requisição
        });
        handleClose();
        window.location.reload();
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleChangeValues = (value) => {
        setEditValues((prevValues) => ({
            ...prevValues,
            [value.target.id]: value.target.value,
        }));
    };

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Editar</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nome"
                    label="Nome"
                    defaultValue={props.nome}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="data_nascimento"
                    label="Data de Nascimento"
                    defaultValue={props.data_nascimento}
                    onChange={handleChangeValues}
                    type="date"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email"
                    defaultValue={props.email}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="telefone"
                    label="Telefone"
                    defaultValue={props.telefone}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="endereco"
                    label="Endereço"
                    defaultValue={props.endereco}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="rg"
                    label="RG"
                    defaultValue={props.rg}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="cpf"
                    label="CPF"
                    defaultValue={props.cpf}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="matricula"
                    label="Matrícula"
                    defaultValue={props.matricula}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="vencimento"
                    label="Vencimento"
                    defaultValue={props.vencimento}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="valor_mensalidade"
                    label="Valor Mensalidade"
                    defaultValue={props.valor_mensalidade}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="status_pagamento"
                    label="Status de Pagamento"
                    defaultValue={props.status_pagamento ? "Pago" : "Não Pago"}
                    onChange={(e) => setEditValues({ ...editValues, status_pagamento: e.target.checked })}
                    type="checkbox"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleEditGame}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}
