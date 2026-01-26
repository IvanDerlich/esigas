'use client';

import { RefObject } from 'react';
import styles from './calculator.module.css';

interface Props {
  step2Ref: RefObject<HTMLDivElement | null>;
  interClass: string;

  equipmentPrice: number | '';
  installments: number | '';
  annualInterest: number | '';

  setEquipmentPrice: (v: number | '') => void;
  setInstallments: (v: number | '') => void;
  setAnnualInterest: (v: number | '') => void;

  calculatedStep2: boolean;
  setCalculatedStep2: (v: boolean) => void;

  isStep2Valid: boolean;

  monthlySavings: number;
  monthlyInstallment: number;
  difference: number;
  savingsGreaterThanInstallment: boolean;
  discountPercent: number;

  resetStep2: () => void;
  goBackToStep1: () => void;
}

export default function StepTwoCard({
  step2Ref,
  interClass,
  equipmentPrice,
  installments,
  annualInterest,
  setEquipmentPrice,
  setInstallments,
  setAnnualInterest,
  calculatedStep2,
  setCalculatedStep2,
  isStep2Valid,
  monthlySavings,
  monthlyInstallment,
  difference,
  savingsGreaterThanInstallment,
  discountPercent,
  resetStep2,
  goBackToStep1,
}: Props) {
  return (
    <div ref={step2Ref} className={`${interClass} ${styles.calculator}`}>
      <div className={styles.calculatorContainer}>
        <h2 className={styles.calculatorTitle}>Financiación</h2>

        <div className={styles.inputContainer}>
          <form className={styles.form}>
            <label>Precio del equipo</label>
            <div className={styles.inputWithUnit}>
              <input
                className={styles.input}
                type="number"
                min={0}
                value={equipmentPrice}
                onChange={e => {
                  const value = e.target.value;
                  if (value === '') {
                    setEquipmentPrice('');
                    return;
                  }
                  const num = Number(value);
                  if (num < 0) return;
                  setEquipmentPrice(num);
                }}
              />
              <span className={styles.unit}>$</span>
            </div>

            <label>Cuotas</label>
            <input
              className={styles.input}
              type="number"
              min={1}
              value={installments}
              onChange={e => {
                const value = e.target.value;
                if (value === '') {
                  setInstallments('');
                  return;
                }
                const num = Number(value);
                if (num < 0) return;
                setInstallments(num);
              }}
            />

            <label>Interés anual</label>
            <div className={styles.inputWithUnit}>
              <input
                className={styles.input}
                type="number"
                min={0}
                value={annualInterest}
                onChange={e => {
                  const value = e.target.value;
                  if (value === '') {
                    setAnnualInterest('');
                    return;
                  }
                  const num = Number(value);
                  if (num < 0) return;
                  setAnnualInterest(num);
                }}
              />
              <span className={styles.unit}>%</span>
            </div>
          </form>

          {calculatedStep2 && (
            <div className={styles.resultsSection}>
              <div className={styles.resultsContainer}>
                <div className={`${styles.resultsItem} ${styles.borderTop}`}>
                  <p className={styles.textResults}>Ahorro mensual:</p>
                  <p className={styles.green}>${monthlySavings.toFixed(0)}</p>
                </div>

                <div className={styles.resultsItem}>
                  <p className={styles.textResults}>
                    Valor de la cuota (Con interés):
                  </p>
                  <p className={styles.green}>
                    ${monthlyInstallment.toFixed(0)}
                  </p>
                </div>

                <div className={`${styles.resultsItem} ${styles.borderBottom}`}>
                  <p className={styles.textResults}>Diferencia:</p>
                  <p className={styles.green}>${difference.toFixed(0)}</p>
                </div>
              </div>

              {savingsGreaterThanInstallment ? (
                <div className={styles.explanationContainer}>
                  <p className={styles.explanation}>
                    <span className={styles.titleExplanation}>
                      Explicación:
                    </span>
                    <br />
                    Por mes vas a estar pagando una cuota de $
                    {monthlyInstallment.toFixed(0)} para pagar el equipo.
                    <br />
                    Por lo que la cuota se paga con el ahorro y todos los meses
                    te va a sobrar ${difference.toFixed(0)} en tu bolsillo!
                    <br />
                    Al cabo de {installments} meses, te va a quedar cada mes $
                    {monthlySavings.toFixed(0)} en tu bolsillo
                  </p>
                </div>
              ) : (
                <div className={styles.explanationContainer}>
                  <p className={styles.explanation}>
                    <span className={styles.titleExplanation}>
                      Explicación:
                    </span>
                    <br />
                    Por mes vas a estar pagando una cuota de $
                    {monthlyInstallment.toFixed(0)} para pagar el equipo.
                    <br />
                    Por lo que la cuota te baja ${monthlySavings.toFixed(0)}!
                    <br />O sea que la cuota va a tener un descuento del{' '}
                    {discountPercent.toFixed(0)}%!
                    <br />
                    Al cabo de {installments} meses te va a quedar en tu
                    bolsillo ${monthlySavings.toFixed(0)} todos los meses.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.buttonBack}
            onClick={() => {
              if (calculatedStep2) {
                resetStep2();
              } else {
                goBackToStep1();
              }
            }}
          >
            {calculatedStep2 ? 'Volver a calcular' : 'Volver al paso anterior'}
          </button>

          <button
            className={styles.button}
            disabled={!isStep2Valid || calculatedStep2}
            onClick={() => {
              if (!isStep2Valid || calculatedStep2) return;
              setCalculatedStep2(true);
            }}
          >
            Calcular
          </button>
        </div>

        <p className={styles.disclaimer}>
          *Los valores presentados son meramente estimativos y no constituyen
          una proyección exacta de la realidad. Antes de tomar cualquier
          decisión, se recomienda realizar un análisis detallado.
        </p>
      </div>
    </div>
  );
}
