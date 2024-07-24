import { useState, useCallback, useEffect } from 'react';
import { Button } from '../Button/Button';

import styles from './App.module.css';


const arrBtnsNum = ['0', '3', '2', '1', '6', '5', '4', '9', '8', '7'].reverse();
const operators = ['-', '+'];
const initialState = {
  label: '', num1: '', num2: '', opr: '', result: ''
};

export const App = () => {
  const [stateCalc, setStateCalc] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    setStateCalc(initialState)
  }, [])

  const setNumberClick = useCallback((e, num) => {
    if (color) {
      resetCalc();
    }
    setStateCalc(prevState => {
      const { opr, num1, num2 } = prevState;
      return opr
        ? { ...prevState, label: prevState.label + num, num2: num2 + num }
        : { ...prevState, label: prevState.label + num, num1: num1 + num };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  const setOperateClick = useCallback((e, opr) => {
    setStateCalc(prevState => ({ ...prevState, opr, label: '' }));
    setColor('');
  }, []);

  const resultCalc = useCallback(() => {
    const { num1, num2, opr } = stateCalc;
    if (num1 && num2 && operators.includes(opr)) {
      operateState(opr);
      setColor(styles.result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateCalc]);

  const resetCalc = useCallback(() => {
    setStateCalc(initialState);
    setColor('');
  }, []);

  const operateState = useCallback((operator) => {
    const { num1, num2 } = stateCalc;
    const result = operator === '+' ? +num1 + +num2 : +num1 - +num2;
    setStateCalc(prevState => ({
      ...prevState,
      label: result,
      num1: result,
      num2: ''
    }));
  }, [stateCalc]);

  return (
    <section className={styles.app}>
      <div className={styles.container}>
        <div className={`${styles.label} ${color}`}>{stateCalc.label || '0'}</div>
        <div className={styles.calcNum}>
          <div>
            {arrBtnsNum.map(el => (
              <Button
                key={el}
                text={el}
                className={styles.btnNum}
                onClick={setNumberClick}
              />
            ))}
          </div>
          <div className={styles.opr}>
            <Button text="C" className={styles.btnC} onClick={resetCalc} />
            {operators.map(opr => (
              <Button
                key={opr}
                text={opr}
                className={styles.btnOpr}
                onClick={setOperateClick}
              />
            ))}
            <Button text="=" className={styles.btnOpr} onClick={resultCalc} />
          </div>
        </div>
      </div>
    </section>
  );
};
