import React, { useState, useEffect, useRef } from 'react';
import styles from '../App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faList, faDollarSign, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import { getOperations, createOperation, deleteOperation } from '../services/api';
import grafico12 from "../images/grafico12.gif";
import setaGreen from "../images/setaGreen.gif";
import * as moment from 'moment';
import cx from 'classnames';
import CurrencyFormat from 'react-currency-format';
import { XYPlot, RadialChart } from 'react-vis';
function Dashboard() {
  const [user, setUser] = useState({});
  const [operations, setOperations] = useState([]);
  const [errors, setErrors] = useState([]);
  const [currentValue, setCurrentValue] = useState(0);
  const [chartData, setChartData] = useState([
    {
      angle: 0,
      radius: 1,
      color: '#eb0000'
    },
    {
      angle: 0,
      radius: 1,
      color: '#61DA47'
    }
  ])
  const [values, setValues] = useState({ positive: 0, negative: 0 })
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
    if (operations.length) {
 
 
      let positiveValue, negativeValue, totalValue;
 
      if (operations.length) {
        totalValue = operations.reduce((a, b) => ({ value: Number(a.value) + Number(b.value) }));
      } else {
        totalValue = 0;
      }
 
      if (operations.filter(op => op.type === 'entrada').length) {
        positiveValue = operations.filter(op => op.type === 'entrada').reduce((a, b) => ({ value: Number(a.value) + Number(b.value) }))
      } else {
        positiveValue = 0;
      }
 
      if (operations.filter(op => op.type === 'saida').length) {
        negativeValue = operations.filter(op => op.type === 'saida').reduce((a, b) => ({ value: Number(a.value) + Number(b.value) }))
      } else {
        negativeValue = 0;
      }
 
      const newChartData = [
        {
          angle: (negativeValue.value / totalValue.value) * 100,
          radius: 1, // controla tamanho da torta
          color: '#eb0000'
        },
        {
          angle: (positiveValue.value / totalValue.value) * 100,
          radius: 1,
          color: '#61DA47'
        }
      ]
      setValues({ positive: positiveValue.value, negative: negativeValue.value })
      setChartData(newChartData)
    }
  }, [operations]);
 
  const myData = [
 
  ]
 
  async function calculateCurrentValue() {
    let computedValue = user.initialValue;
    await operations.forEach(operation => {
      if (operation.type === 'entrada') {
        computedValue += Number(operation.value)
      } else {
        computedValue -= Number(operation.value)
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
 
  const redCard = cx(
    styles.operationBox,
    styles.borderRed,
  )
 
  const greenCard = cx(
    styles.operationBox,
    styles.borderGreen,
  )
 
  async function handleDelete(id) {
    const res = await deleteOperation(id);
    if (res) {
      reloadOperations();
    }
  }
 
  function operationList() {
    return operations.map((operation, key) => {
      return (
        <div className={operation.type === 'entrada' ? greenCard : redCard} key={key}>
          <div className={styles.dateWrapper}>
            {operation.createdAt}
          </div>
          <div className={styles.operationName}>
            {operation.name}
          </div>
          <div className={styles.operationValue}>
            <CurrencyFormat value={operation.value} displayType={'text'} thousandSeparator={true} prefix={'R$'} decimalSeparator={','} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale />
          </div>
          <div className={styles.deleteButton} onClick={() => handleDelete(operation['_id']['$oid'])}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
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
    <div className={styles.divMainUser}> 

  
      {renderRedirect()}
      <div className={styles.welcome}>
        <FontAwesomeIcon icon={faUser} />
        <span className={styles.userName}>
          {user.name}
        </span>
        <CurrencyFormat value={currentValue} displayType={'text'} thousandSeparator={true} prefix={'R$'} decimalSeparator={','} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale />
      </div>
      <div className={styles.logOut} onClick={signOut}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        <img className={styles.sair} src={setaGreen} alt="w"></img>
        Sair
      </div>
      <div className={styles.chartTitle}>
        Resumo de operações
      </div>
      <div className={styles.chartWrapper}>
        <div className={styles.chartInfoWrapper}>
          <div className={styles.chartInfo}>
            <div className={styles.redSquare} />
            <CurrencyFormat value={values.negative} displayType={'text'} thousandSeparator={true} prefix={'R$'} decimalSeparator={','} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale />
          </div>
          <div className={styles.chartInfo}>
            <div className={styles.greenSquare} />
            <CurrencyFormat value={values.positive} displayType={'text'} thousandSeparator={true} prefix={'R$'} decimalSeparator={','} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale />
          </div>
        </div>
        <RadialChart data={chartData} height={200} width={200} colorType="literal" />
      </div>
      <div className={styles.chartTitle}>
        Inserir operação
      </div>
      <div className={styles.insertOperation}>
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
      <div className={styles.chartTitle}>
        Lista de operações
      </div>
      <div className={styles.cardMain}>
        <div className={styles.operationsList}>
          {operationList()}
        </div>
      </div>
 
 
      </div>
    </>
  );
};
 
export default Dashboard;