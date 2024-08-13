import "../Styles/Login.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import Img from "../Assets/database.svg";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

function Login({ logado = false }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (values) => {
    setIsLoading(true);

    Axios.post("https://server-mxrj.onrender.com/login", {
      email: values.email,
      password: values.password,
    })
    .then((response) => {
      const page = response.data;

      if (page === true) {
        localStorage.setItem('@user', JSON.stringify(response.config.data));
        navigate('/'); // Redireciona para a página CRUD
        window.location.reload();
      } else {
        alert(response.data.msg);
      }
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error);
      alert("Ocorreu um erro ao fazer login. Tente novamente mais tarde.");
    })
    .finally(() => {
      setIsLoading(false); // Esconde a mensagem de "aguarde"
    });
  };

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("Email inválido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
  });

  return (
    <div className="body">
      <div className="left-login">
        <img src={Img} alt="Pessoas olhando gráficos" className="chart" />
      </div>

      <div className="right-login">
        <div className="card-login">
          <div className="user-links">
            <div className="user-link-home">
              {!logado && <Link to="/">Home</Link>}
            </div>

            <div className="user-link-cad">
              {!logado && <Link to="/cadastro">Cadastro</Link>}
            </div>
          </div>
          <h1>LOGIN</h1>
          <Formik
            initialValues={{}}
            onSubmit={handleLogin}
            validationSchema={validationsLogin}
          >
            <Form className="login-form">
              <div className="form-group">
                <label form="email">Usuário</label>

                <Field name="email" type='email' className="form-field" placeholder="Email" />

                <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"
                />
              </div>

              <div className="form-group">
                <label form="email">Senha</label>
                <Field name="password" type='password' className="form-field" placeholder="Senha" />

                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                />
              </div>

              <button className="button" type="submit" disabled={isLoading}>
                {isLoading ? "Por favor, aguarde..." : "ENTRAR"}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
