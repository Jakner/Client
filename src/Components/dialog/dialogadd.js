import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Axios from "axios";

export default function FormDialogadd(props) {
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
    });

    const handleAddAluno = async () => {
        await Axios.post("https://server-mxrj.onrender.com/insert", {
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
        });
        handleClose();
        window.location.reload();
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleChangeValues = (e) => {
        const { id, value } = e.target;
        setEditValues(prevValues => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleCpfChange = (e) => {
        const { value } = e.target;
        const formattedCpf = value
            .replace(/\D/g, '') // Remove caracteres não numéricos
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        setEditValues(prevValues => ({
            ...prevValues,
            cpf: formattedCpf,
        }));
    };

    const handleValorChange = (e) => {
        const { value } = e.target;
        // Permite apenas números
        setEditValues(prevValues => ({
            ...prevValues,
            valor_mensalidade: value.replace(/[^0-9]/g, ''),
        }));
    };

    const handleTelefoneChange = (e) => {
        const { value } = e.target;
        // Permite apenas números
        setEditValues(prevValues => ({
            ...prevValues,
            telefone: value.replace(/[^0-9]/g, ''),
        }));
    };

    const handleRgChange = (e) => {
        const { value } = e.target;
        // Permite apenas números
        setEditValues(prevValues => ({
            ...prevValues,
            rg: value.replace(/[^0-9]/g, ''),
        }));
    };

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Cadastrar</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nome"
                    label="Nome"
                    value={editValues.name}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="data_nascimento"
                    label="Data de Nascimento"
                    value={editValues.data_nascimento}
                    onChange={handleChangeValues}
                    type="date"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email"
                    value={editValues.email}
                    onChange={handleChangeValues}
                    type="email" // Garante que o valor seja um email válido
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="telefone"
                    label="Telefone"
                    value={editValues.telefone}
                    onChange={handleTelefoneChange}
                    type="text"
                    inputMode="numeric" // Exibe teclado numérico em dispositivos móveis
                    pattern="[0-9]*" // Validação de números apenas
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="endereco"
                    label="Endereço"
                    value={editValues.endereco}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="rg"
                    label="RG"
                    value={editValues.rg}
                    onChange={handleRgChange}
                    type="text"
                    inputMode="numeric" // Exibe teclado numérico em dispositivos móveis
                    pattern="[0-9]*" // Validação de números apenas
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="cpf"
                    label="CPF"
                    value={editValues.cpf}
                    onChange={handleCpfChange}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="matricula"
                    label="Matrícula"
                    value={editValues.matricula}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="vencimento"
                    label="Vencimento"
                    value={editValues.vencimento}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="valor_mensalidade"
                    label="Valor Mensalidade"
                    value={editValues.valor_mensalidade}
                    onChange={handleValorChange}
                    type="text"
                    inputMode="numeric" // Exibe teclado numérico em dispositivos móveis
                    pattern="[0-9]*" // Validação de números apenas
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddAluno}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}
