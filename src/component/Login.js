import React, { useState, useEffect, useRef } from "react";
import Icon from "../component/Icon";
import logo from "../images/gifDinheiro.gif";
import style from "../App.module.css";
import logoPrice from "../images/logoPrice.png";
import { login } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'


function Login() {
  const [errors, setErrors] = useState([])
  const [redirectDashboard, setRedirectDashboard] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  function renderRedirect() {
    if (localStorage.getItem('mymoney-user')) {
      return <Redirect to='/dashboard' />
    }
    if (redirectDashboard) {
      return <Redirect to='/dashboard' />
    }
    return null;
  }

  function validate() {
    const newErrors = [];
    if (!usernameRef.current.value) {
      newErrors.push('username');
    }
    if (!passwordRef.current.value) {
      newErrors.push('password');
    }
    if (!newErrors.length) {
      login(usernameRef.current.value, passwordRef.current.value)
        .then(res => {
          setRedirectDashboard(res);
          if (!res) {
            setErrors(['incorrectCredentials']);
          }
        });
    }
    setErrors([...newErrors]);
  }

  return (
    <div className={style.main}>
      {renderRedirect()}
      <div className={style.logo}>
        <img className={style.imgLogo} src={logoPrice} alt="w"></img>
      </div>
      <div className={style.mainImg}>
        <div className={style.image}>
          <img className={style.img} src={logo} alt="w"></img>
        </div>
      </div>
      <div className={style.mainLogin}>
        <h1 className={style.title}>Login</h1>
        <div className={style.divInput}>
          <FontAwesomeIcon icon={faUser} className={style.iconBlock} />
          <span className={style.spanText}>E-mail</span>
          <input
            ref={usernameRef}
            className={style.input}
            type="text"
            placeholder="Nome de usuário"
          ></input>
        </div>
        {
          errors.includes('username') && (
            <div className={style.error}>
              Digite seu nome de usuário.
            </div>
          )
        }
        <div className={style.divInput}>
          <FontAwesomeIcon icon={faLock} className={style.iconBlock} />
          <span className={style.spanText}>Senha</span>
          <input
            ref={passwordRef}
            className={style.input}
            type="password"
            placeholder="Digite sua senha"
          ></input>
        </div>
        {
          errors.includes('password') && (
            <div className={style.error}>
              Digite sua senha.
            </div>
          )
        }
        {
          errors.includes('incorrectCredentials') && (
            <div className={style.error}>
              Usuário ou senha incorretos.
            </div>
          )
        }
        <button className={style.button} onClick={validate}>ENTRAR</button>
        <p>
          É novo por aqui ? &nbsp;
          <a className={style.link} href="cadastro">
            Criar Conta
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
