import React from "react";
import Icon from "../component/Icon";
import logo from "../images/Dinheiro-1.gif";
import style from "../App.module.css";
import logoPrice from "../images/logoPrice.png";

function Register() {
  return (
    <div className={style.main}>
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
          <Icon className={style.icon} email="email" />
          <span className={style.spanText}>E-mail</span>
          <input
            className={style.input}
            type="text"
            placeholder="Digite seu email"
          ></input>
        </div>
        <div className={style.divInput}>
          <Icon className={style.iconBlock} />

          <span className={style.spanText}>Senha</span>
          <input
            className={style.input}
            type="password"
            placeholder="Digite sua senha"
          ></input>
        </div>
        <div className={style.divInput}>
          <Icon className={style.iconBlock} />

          <span className={style.spanText}>Confirmar Senha</span>
          <input
            className={style.input}
            type="password"
            placeholder="Confirmar a senha"
          ></input>
        </div>
        <button className={style.button}>CRIAR CONTA</button>
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
