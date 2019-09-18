import React from "react";
import Icon from "../component/Icon";
import logo from "../images/gifDinheiro.gif";
import style from "../App.module.css";
import logoPrice from "../images/logoPrice.png";

function Login() {
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
        <h1 className={style.title}>Login</h1>
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
        <button className={style.button}>ENTRAR</button>
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
