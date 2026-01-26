'use client';

import { RefObject } from 'react';
import styles from './calculator.module.css';

interface Props {
  step1Ref: RefObject<HTMLDivElement | null>;
  interClass: string;

  fuelMonthly: number | '';
  fuelPrice: number | '';
  gncPrice: number | '';

  setFuelMonthly: (v: number | '') => void;
  setFuelPrice: (v: number | '') => void;
  setGncPrice: (v: number | '') => void;

  calculatedStep1: boolean;
  setCalculatedStep1: (v: boolean) => void;

  isStep1Valid: boolean;

  fuelLiters: number;
  gncM3: number;
  gncMonthlyCost: number;
  monthlySavings: number;

  resetStep1: () => void;
  goToStep2: () => void;

  INITIAL_INSTALLMENTS: number;
  INITIAL_INTEREST: number;
  setInstallments: React.Dispatch<React.SetStateAction<number | ''>>;
  setAnnualInterest: React.Dispatch<React.SetStateAction<number | ''>>;
}

export default function StepOneCard({
  step1Ref,
  interClass,
  fuelMonthly,
  fuelPrice,
  gncPrice,
  setFuelMonthly,
  setFuelPrice,
  setGncPrice,
  calculatedStep1,
  setCalculatedStep1,
  isStep1Valid,
  fuelLiters,
  gncM3,
  gncMonthlyCost,
  monthlySavings,
  resetStep1,
  goToStep2,
  INITIAL_INSTALLMENTS,
  INITIAL_INTEREST,
  setInstallments,
  setAnnualInterest,
}: Props) {
  return (
    <div ref={step1Ref} className={`${interClass} ${styles.calculator}`}>
      <div className={styles.calculatorContainer}>
        <h2 className={styles.calculatorTitle}>Ingresá tus datos de consumo</h2>

        <div className={styles.inputContainer}>
          <form className={styles.form}>
            <label>¿Cuánto gastás por mes en nafta?</label>
            <div className={styles.inputWithUnit}>
              <input
                className={styles.input}
                type="number"
                min={0}
                value={fuelMonthly}
                onChange={e => {
                  const value = e.target.value;
                  if (value === '') {
                    setFuelMonthly('');
                    return;
                  }
                  const num = Number(value);
                  if (num < 0) return;
                  setFuelMonthly(num);
                }}
              />
              <span className={styles.unit}>$</span>
            </div>

            <label>Precio del litro de nafta</label>
            <div className={styles.inputWithUnit}>
              <input
                className={styles.input}
                type="number"
                min={0}
                value={fuelPrice}
                onChange={e => {
                  const value = e.target.value;
                  if (value === '') {
                    setFuelPrice('');
                    return;
                  }
                  const num = Number(value);
                  if (num < 0) return;
                  setFuelPrice(num);
                }}
              />
              <span className={styles.unit}>$/L</span>
            </div>

            <label>Precio del m³ de GNC</label>
            <div className={styles.inputWithUnit}>
              <input
                className={styles.input}
                type="number"
                min={0}
                value={gncPrice}
                onChange={e => {
                  const value = e.target.value;
                  if (value === '') {
                    setGncPrice('');
                    return;
                  }
                  const num = Number(value);
                  if (num < 0) return;
                  setGncPrice(num);
                }}
              />
              <span className={styles.unit}>$/M³</span>
            </div>
          </form>

          {calculatedStep1 && (
            <div className={styles.resultsSection}>
              <div className={styles.resultsContainer}>
                <div className={`${styles.resultsItem} ${styles.borderTop}`}>
                  <p className={styles.textResults}>
                    Consumo de nafta por mes:
                  </p>
                  <p className={styles.green}>{fuelLiters.toFixed(2)} l</p>
                </div>

                <div className={styles.resultsItem}>
                  <p className={styles.textResults}>Consumo de GNC por mes:</p>
                  <p className={styles.green}>{gncM3.toFixed(2)} m³</p>
                </div>

                <div className={`${styles.resultsItem} ${styles.borderBottom}`}>
                  <p className={styles.textResults}>Gasto de GNC por mes:</p>
                  <p className={styles.green}>${gncMonthlyCost.toFixed(0)}</p>
                </div>

                <div className={styles.resultsItem}>
                  <p className={styles.green}>Ahorro mensual</p>
                  <p className={styles.green}>${monthlySavings.toFixed(0)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.buttonContainer}>
          {calculatedStep1 ? (
            <button className={styles.buttonBack} onClick={resetStep1}>
              Volver a calcular
            </button>
          ) : (
            <div style={{ width: 235 }} />
          )}

          <button
            className={styles.button}
            disabled={!isStep1Valid && !calculatedStep1}
            onClick={() => {
              if (!calculatedStep1) {
                if (!isStep1Valid) return;
                setCalculatedStep1(true);
              } else {
                setInstallments(prev =>
                  prev === '' ? INITIAL_INSTALLMENTS : prev
                );
                setAnnualInterest(prev =>
                  prev === '' ? INITIAL_INTEREST : prev
                );
                goToStep2();
              }
            }}
          >
            {calculatedStep1 ? 'Continuar' : 'Calcular'}
          </button>
        </div>
      </div>
    </div>
  );
}
