import React, { useState, useEffect, useRef } from 'react';
import styles from '../App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faList, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import { getOperations, createOperation } from '../services/api';
function Dashboard() {
  const [user, setUser] = useState({});
  const [operations, setOperations] = useState([]);
  const [errors, setErrors] = useState([]);
  const [currentValue, setCurrentValue] = useState(0);

  const descriptionRef = useRef();
  const valueRef = useRef();
  const typeRef = useRef();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('mymoney-user'));
    user.initialValue = Number(user.initialValue);
    reloadOperations(user.username)
    setUser(user);
  }, [])

  useEffect(() => {
    calculateCurrentValue();
  }, [operations]);

  async function calculateCurrentValue() {
    let computedValue = user.initialValue;
    await operations.forEach(operation => {
      if (operation.type === 'entrada') {
        computedValue += Number(operation.value)
        var element = document.getElementById("card");
        element.classList.add("cardGreen");
      } else {
        computedValue -= Number(operation.value)
        var element = document.getElementById("card" );
        element.classList.add("cardRed");
      }
    });
    setCurrentValue(computedValue);
  }

  function reloadOperations(username = '') {
    getOperations(username ? username : user.username)
      .then(res => {
        setOperations(res);
      })
  }

  function renderRedirect() {
    if (!localStorage.getItem('mymoney-user')) {
      return <Redirect to='/login' />
    }
    return null;
  }

  function signOut() {
    localStorage.removeItem('mymoney-user');
    setUser({});
  }

  function operationList() { 
    return operations.map((operation, key) => {
      return (
        <div className={styles.operation} key={key}>
          <div className={styles.cardSub}>
          <p className={styles.cardName}> {operation.name} </p>
          <p id="card" className={styles.cardGreen}>no valor de R${operation.value} </p>
          </div>
          <p  className={styles.cardDate}>  {operation.createdAt} </p>
        </div>
      )
    })
  }

  function validate() {
    const date = new Date();
    const payload = {
      name: descriptionRef.current.value,
      value: valueRef.current.value,
      type: typeRef.current.value,
      username: user.username,
      createdAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`,
    };
    const newErrors = [];
    if (!payload.name) {
      newErrors.push('description');
    }
    if (!payload.value) {
      newErrors.push('value');
    }
    if (!payload.type) {
      newErrors.push('type');
    }
    if (!newErrors.length) {
      createOperation(payload)
        .then(res => {
          if (res) {
            reloadOperations();
          }
        })
    }
    setErrors([...newErrors]);
  }

  return (
    <>
      {renderRedirect()}
      <div className={styles.welcome}>
        Olá,{user.name}. <br /> Seu saldo é de R$ {Number(currentValue).toFixed(2)} reais.
      </div>
      <div className={styles.logOut} onClick={signOut}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        Sair
      </div>
      <div className={styles.insertOperation}>
        <p> Inserir nova operação </p>
        <div className={styles.divInput}>
          <FontAwesomeIcon icon={faList} className={styles.iconBlock} />
          <span className={styles.spanText}>Descrição do item</span>
          <input
            ref={descriptionRef}
            className={styles.input}
            type="text"
            placeholder="Descrição do item"
          ></input>
        </div>
        {
          errors.includes('description') && (
            <div className={styles.error}>
              Insira uma descrição.
            </div>
          )
        }
        <div className={styles.divInput}>
          <FontAwesomeIcon icon={faDollarSign} className={styles.iconBlock} />
          <span className={styles.spanText}>Valor</span>
          <input
            ref={valueRef}
            className={styles.input}
            type="text"
            placeholder="Valor"
          ></input>
        </div>
        {
          errors.includes('value') && (
            <div className={styles.error}>
              Insira um valor.
            </div>
          )
        }
        <div className={styles.divInput}>
          <FontAwesomeIcon icon={faDollarSign} className={styles.iconBlock} />
          <span className={styles.spanText}>Tipo de transação</span>
          <select
            ref={typeRef}
            className={styles.select}
            type="text"
            placeholder="Tipo de transação"
          >
            <option value="entrada"> Entrada </option>
            <option value="saida"> Saída </option>
          </select>
        </div>
        {
          errors.includes('type') && (
            <div className={styles.error}>
              Insira um tipo de transação.
            </div>
          )
        }
        <button className={styles.button} onClick={validate}>Cadastrar</button>
      </div>
      <p className={styles.operationsListTitle}>
        Lista de operações
      </p>
      <div className={styles.cardMain}>
      <div className={styles.operationsList}>
        {operationList()} 
      </div>
      </div>

      
      
    </>
  );
};

export default Dashboard;