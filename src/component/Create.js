import React, { useRef, useState } from "react";
import Icon from "../component/Icon";
import logo from "../images/Dinheiro-1.gif";
import style from "../App.module.css";
import logoPrice from "../images/logoPrice.png";
import { register } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEnvelope, faDollarSign, } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'

function Register() {
  const [errors, setErrors] = useState([]);
  const [redirectLogin, setRedirectLogin] = useState(false);
  const usernameRef = useRef();
  const completeNameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const initialValueRef = useRef();

  function renderRedirect() {
    if (localStorage.getItem('mymoney-user')) {
      return <Redirect to='/dashboard' />
    }
    if (redirectLogin) {
      return <Redirect to='/login' />
    }
    return null;
  }

  function validate() {
    const payload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      name: completeNameRef.current.value,
      initialValue: initialValueRef.current.value,
    }
    const newErrors = [];
    if (!payload.username) {
      newErrors.push('username');
    }
    if (!payload.password) {
      newErrors.push('password');
    }
    if (!payload.name) {
      newErrors.push('name');
    }
    if (!payload.initialValue) {
      newErrors.push('initialValue');
    }
    if (!confirmPasswordRef.current.value) {
      newErrors.push('confirmPassword');
    }

    if (!newErrors.includes('password') && !newErrors.includes('confirmPassword') && payload.password !== confirmPasswordRef.current.value) {
      newErrors.push('passwordDontMatch');
    }

    if (!newErrors.length) {
      register(payload)
        .then(res => {
          if (res) {
            console.log(res);
            setRedirectLogin(true);
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
        <h1 className={style.title}>Criar Conta</h1>
        <div className={style.divInput}>
          <FontAwesomeIcon icon={faEnvelope} className={style.iconBlock} />
          <span className={style.spanText}>Nome de usuário</span>
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
          <FontAwesomeIcon icon={faUser} className={style.iconBlock} />
          <span className={style.spanText}>Nome Completo</span>
          <input
            ref={completeNameRef}
            className={style.input}
            type="text"
            placeholder="Nome Completo"
          ></input>
        </div>
        {
          errors.includes('name') && (
            <div className={style.error}>
              Digite seu nome real.
            </div>
          )
        }
        <div className={style.divInput}>
          <FontAwesomeIcon icon={faDollarSign} className={style.iconBlock} />
          <span className={style.spanText}>Renda Inicial</span>
          <input
            ref={initialValueRef}
            className={style.input}
            type="text"
            placeholder="Renda Inicial"
          ></input>
        </div>
        {
          errors.includes('initialValue') && (
            <div className={style.error}>
              Digite seu valor inicial.
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
        <div className={style.divInput}>
          <FontAwesomeIcon icon={faLock} className={style.iconBlock} />

          <span className={style.spanText}>Confirmar Senha</span>
          <input
            ref={confirmPasswordRef}
            className={style.input}
            type="password"
            placeholder="Confirmar a senha"
          ></input>
        </div>
        {
          errors.includes('confirmPassword') && (
            <div className={style.error}>
              Digite a confirmação de senha.
            </div>
          )
        }
        {
          errors.includes('passwordDontMatch') && (
            <div className={style.error}>
              As senhas devem ser iguais.
            </div>
          )
        }
        <button className={style.button} onClick={validate}>CRIAR CONTA</button>
        <p>
          Ja possui cadastro ? &nbsp;
          <a className={style.link} href="/">
            Fazer Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
