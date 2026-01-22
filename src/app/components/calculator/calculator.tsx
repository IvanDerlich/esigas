'use client';
import { abyssinica, inter } from '@/app/assets/fonts';
import { useState, useRef, useEffect } from 'react';
import styles from './calculator.module.css';
import Image from 'next/image';
import numberOne from '@/images/number-one.png';
import numberTwo from '@/images/number-two.png';
import calculatorImage from '@/images/img-calculadora.png';
import calculatorMiniature from '@/images/img-calculadora2.png';

export default function Calculator() {
  const step1Ref = useRef<HTMLDivElement | null>(null);
  const step2Ref = useRef<HTMLDivElement | null>(null);
  const [sideOffset, setSideOffset] = useState(0);
  const [dynamicHeight, setDynamicHeight] = useState(0);

  const slowScrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;

    const y = ref.current.getBoundingClientRect().top + window.scrollY - 20;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  };

  const [step, setStep] = useState<1 | 2>(1);
  const [calculatedStep1, setCalculatedStep1] = useState(false);
  const [calculatedStep2, setCalculatedStep2] = useState(false);

  const [fuelMonthly, setFuelMonthly] = useState<number | ''>('');
  const [fuelPrice, setFuelPrice] = useState<number | ''>('');
  const [gncPrice, setGncPrice] = useState<number | ''>('');

  const isStep1Valid =
    fuelMonthly !== '' &&
    fuelPrice !== '' &&
    gncPrice !== '' &&
    fuelMonthly > 0 &&
    fuelPrice > 0 &&
    gncPrice > 0;

  const fuelLiters = fuelMonthly && fuelPrice ? fuelMonthly / fuelPrice : 0;

  const INITIAL_INSTALLMENTS = 12;
  const INITIAL_INTEREST = 0;

  const gncM3 = fuelLiters * 1.1;
  const gncMonthlyCost = gncM3 * (gncPrice || 0);
  const monthlySavings = Math.max(0, (fuelMonthly || 0) - gncMonthlyCost);

  const [equipmentPrice, setEquipmentPrice] = useState<number | ''>('');
  const [installments, setInstallments] = useState<number | ''>(
    INITIAL_INSTALLMENTS
  );
  const [annualInterest, setAnnualInterest] = useState<number | ''>(
    INITIAL_INTEREST
  );

  const isStep2Valid =
    equipmentPrice !== '' &&
    installments !== '' &&
    annualInterest !== '' &&
    equipmentPrice > 0 &&
    installments > 0 &&
    annualInterest >= 0;

  const monthlyInterest =
    annualInterest && installments ? Number(annualInterest) / 100 / 12 : 0;

  const monthlyInstallment =
    equipmentPrice && installments && monthlyInterest
      ? (Number(equipmentPrice) * monthlyInterest) /
        (1 - Math.pow(1 + monthlyInterest, -Number(installments)))
      : equipmentPrice && installments
        ? Number(equipmentPrice) / Number(installments)
        : 0;

  const difference = Math.abs(monthlySavings - monthlyInstallment);

  const savingsGreaterThanInstallment = monthlySavings >= monthlyInstallment;

  const discountPercent =
    monthlyInstallment > 0 ? (monthlySavings / monthlyInstallment) * 100 : 0;

  const resetStep1 = () => {
    setFuelMonthly('');
    setFuelPrice('');
    setGncPrice('');
    setCalculatedStep1(false);

    setEquipmentPrice('');
    setInstallments(INITIAL_INSTALLMENTS);
    setAnnualInterest(INITIAL_INTEREST);
    setCalculatedStep2(false);
    setStep(1);

    requestAnimationFrame(() => {
      slowScrollTo(step1Ref);
    });
  };

  const resetStep2 = () => {
    setEquipmentPrice('');
    setInstallments(INITIAL_INSTALLMENTS);
    setAnnualInterest(INITIAL_INTEREST);
    setCalculatedStep2(false);
    slowScrollTo(step2Ref);
  };

  useEffect(() => {
    if (step === 2) {
      requestAnimationFrame(() => {
        slowScrollTo(step2Ref);
      });
    }
  }, [step]);

  const updateHeight = () => {
    let targetElement;

    if (step === 2 && step2Ref.current) {
      targetElement = step2Ref.current;
    } else if (step === 1 && step1Ref.current) {
      targetElement = step1Ref.current;
    }

    if (targetElement) {
      setDynamicHeight(targetElement.offsetHeight);
    }
  };

  useEffect(() => {
    if (step !== 2) {
      setSideOffset(0);
      return;
    }

    if (!step1Ref.current || !step2Ref.current) return;

    const step1Top = step1Ref.current.offsetTop;
    const step2Top = step2Ref.current.offsetTop;

    const offset = step2Top - step1Top;

    setSideOffset(offset);
  }, [step]);

  useEffect(() => {
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    let targetToObserve = null;

    if (step === 1 && step1Ref.current) {
      targetToObserve = step1Ref.current;
    } else if (step === 2 && step2Ref.current) {
      targetToObserve = step2Ref.current;
    }

    if (targetToObserve) {
      observer.observe(targetToObserve);
    }

    return () => {
      observer.disconnect();
    };
  }, [step, calculatedStep1, calculatedStep2]);

  return (
    <>
      <div className={`${abyssinica.className} ${styles.containerTitle}`}>
        <h1 className={styles.title}>Calculadora de Ahorro</h1>
      </div>

      <div className={`${abyssinica.className} ${styles.container}`}>
        <div className={styles.containerText}>
          <p>
            ¿Tenés un vehículo a nafta y querés ver cuánto te ahorrás con GNC?
          </p>
        </div>
      </div>

      <div
        className={styles.calculatorWrapper}
        style={{
          minHeight: dynamicHeight > 0 ? `${dynamicHeight}px` : 'auto',
        }}
      >
        <div
          className={styles.stepsContainer}
          style={{
            transform: `translateY(${sideOffset}px)`,
            transition: step === 2 ? 'transform 400ms ease' : 'none',
            height: dynamicHeight > 0 ? `${dynamicHeight}px` : 'auto',
          }}
        >
          <div className={styles.miniatureContainer}>
            <Image
              className={styles.miniatureImage}
              src={calculatorMiniature}
              alt="Calculadora"
              width={120}
              height={120}
            />
          </div>
          <div className={step === 1 ? styles.stepActive : styles.step}>
            <Image src={numberOne} alt="Número uno" width={37} height={37} />
            <p className={styles.stepsText}>Datos de consumo</p>
          </div>

          <div className={step === 2 ? styles.stepActive : styles.step}>
            <Image src={numberTwo} alt="Número dos" width={37} height={37} />
            <p className={styles.stepsText}>Calcular financiación</p>
          </div>
        </div>

        <div className={styles.calculatorColumn}>
          {/* Card 1 */}
          <div
            ref={step1Ref}
            className={`${inter.className} ${styles.calculator}`}
          >
            <div className={styles.calculatorContainer}>
              <h2 className={styles.calculatorTitle}>
                Ingresá tus datos de consumo
              </h2>

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
                      <div
                        className={`${styles.resultsItem} ${styles.borderTop}`}
                      >
                        <p className={styles.textResults}>
                          Consumo de nafta por mes:
                        </p>
                        <p className={styles.green}>
                          {fuelLiters.toFixed(2)} l
                        </p>
                      </div>

                      <div className={styles.resultsItem}>
                        <p className={styles.textResults}>
                          Consumo de GNC por mes:
                        </p>
                        <p className={styles.green}>{gncM3.toFixed(2)} m³</p>
                      </div>

                      <div
                        className={`${styles.resultsItem} ${styles.borderBottom}`}
                      >
                        <p className={styles.textResults}>
                          Gasto de GNC por mes:
                        </p>
                        <p className={styles.green}>
                          ${gncMonthlyCost.toFixed(0)}
                        </p>
                      </div>

                      <div className={styles.resultsItem}>
                        <p className={styles.green}>Ahorro mensual</p>
                        <p className={styles.green}>
                          ${monthlySavings.toFixed(0)}
                        </p>
                      </div>
                    </div>

                    <div className={styles.explanationContainer}>
                      <p className={styles.explanation}>
                        <span className={styles.titleExplanation}>
                          Explicación:
                        </span>
                        <br />
                        Hoy en día gastas ${Number(fuelMonthly).toFixed(0)}{' '}
                        pesos andando a nafta.
                        <br />
                        Si anduvieses el mes completo a GNC, vas a estar
                        gastando aproximadamente ${gncMonthlyCost.toFixed(
                          0
                        )}{' '}
                        pesos por mes.
                        <br />
                        ¡Esto es una diferencia de ${monthlySavings.toFixed(
                          0
                        )}{' '}
                        pesos a tu favor!!
                      </p>
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

                      setStep(2);
                    }
                  }}
                >
                  {calculatedStep1 ? 'Continuar' : 'Calcular'}
                </button>
              </div>

              <p className={styles.disclaimer}>
                *Los valores presentados son meramente estimativos y no
                constituyen una proyección exacta de la realidad. Antes de tomar
                cualquier decisión, se recomienda realizar un análisis
                detallado.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          {step === 2 && (
            <div
              ref={step2Ref}
              className={`${inter.className} ${styles.calculator}`}
            >
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
                        <div
                          className={`${styles.resultsItem} ${styles.borderTop}`}
                        >
                          <p className={styles.textResults}>Ahorro mensual:</p>
                          <p className={styles.green}>
                            ${monthlySavings.toFixed(0)}
                          </p>
                        </div>

                        <div className={styles.resultsItem}>
                          <p className={styles.textResults}>
                            Valor de la cuota (Con interés):
                          </p>
                          <p className={styles.green}>
                            ${monthlyInstallment.toFixed(0)}
                          </p>
                        </div>

                        <div
                          className={`${styles.resultsItem} ${styles.borderBottom}`}
                        >
                          <p className={styles.textResults}>Diferencia:</p>
                          <p className={styles.green}>
                            ${difference.toFixed(0)}
                          </p>
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
                            {monthlyInstallment.toFixed(0)} para pagar el
                            equipo.
                            <br />
                            Por lo que la cuota se paga con el ahorro y todos
                            los meses te va a sobrar ${difference.toFixed(0)} en
                            tu bolsillo!
                            <br />
                            Al cabo de {installments} meses, te va a quedar cada
                            mes ${monthlySavings.toFixed(0)} en tu bolsillo
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
                            {monthlyInstallment.toFixed(0)} para pagar el
                            equipo.
                            <br />
                            Por lo que la cuota te baja $
                            {monthlySavings.toFixed(0)}!
                            <br />O sea que la cuota va a tener un descuento del{' '}
                            {discountPercent.toFixed(0)}%!
                            <br />
                            Al cabo de {installments} meses te va a quedar en tu
                            bolsillo ${monthlySavings.toFixed(0)} todos los
                            meses.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className={styles.buttonContainer}>
                  {step === 2 && (
                    <button
                      className={styles.buttonBack}
                      onClick={() => {
                        if (calculatedStep2) {
                          resetStep2();
                        } else {
                          setStep(1);
                          requestAnimationFrame(() => {
                            slowScrollTo(step1Ref);
                          });
                        }
                      }}
                    >
                      {calculatedStep2
                        ? 'Volver a calcular'
                        : 'Volver al paso anterior'}
                    </button>
                  )}

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
                  *Los valores presentados son meramente estimativos y no
                  constituyen una proyección exacta de la realidad. Antes de
                  tomar cualquier decisión, se recomienda realizar un análisis
                  detallado.
                </p>
              </div>
            </div>
          )}
        </div>

        <div
          className={styles.imageCalculatorContainer}
          style={{
            transform: `translateY(${sideOffset}px)`,
            transition: step === 2 ? 'transform 400ms ease' : 'none',
            height: dynamicHeight > 0 ? `${dynamicHeight}px` : 'auto',
          }}
        >
          <Image
            className={styles.calculatorImage}
            src={calculatorImage}
            alt="Calculadora"
            width={190}
            height={450}
          />
        </div>
      </div>
    </>
  );
}
