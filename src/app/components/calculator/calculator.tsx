'use client';
import { abyssinica, inter } from '@/app/assets/fonts';
import { useState, useRef, useEffect } from 'react';
import styles from './calculator.module.css';
import Image from 'next/image';
import numberOne from '@/images/number-one.png';
import numberTwo from '@/images/number-two.png';
import calculatorImage from '@/images/img-calculadora.png';
import calculatorMiniature from '@/images/img-calculadora2.png';
import CalculatorStep1 from './stepOneCard';
import CalculatorStep2 from './stepTwoCard';

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

  const gncM3 = fuelLiters * 0.95;
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
    requestAnimationFrame(() => {
      if (step === 1) {
        slowScrollTo(step1Ref);
      }

      if (step === 2) {
        slowScrollTo(step2Ref);
      }
    });
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
          <CalculatorStep1
            step1Ref={step1Ref}
            interClass={inter.className}
            fuelMonthly={fuelMonthly}
            fuelPrice={fuelPrice}
            gncPrice={gncPrice}
            setFuelMonthly={setFuelMonthly}
            setFuelPrice={setFuelPrice}
            setGncPrice={setGncPrice}
            calculatedStep1={calculatedStep1}
            setCalculatedStep1={setCalculatedStep1}
            isStep1Valid={isStep1Valid}
            fuelLiters={fuelLiters}
            gncM3={gncM3}
            gncMonthlyCost={gncMonthlyCost}
            monthlySavings={monthlySavings}
            resetStep1={resetStep1}
            goToStep2={() => setStep(2)}
            INITIAL_INSTALLMENTS={INITIAL_INSTALLMENTS}
            INITIAL_INTEREST={INITIAL_INTEREST}
            setInstallments={setInstallments}
            setAnnualInterest={setAnnualInterest}
          />

          {step === 2 && (
            <CalculatorStep2
              step2Ref={step2Ref}
              interClass={inter.className}
              equipmentPrice={equipmentPrice}
              installments={installments}
              annualInterest={annualInterest}
              setEquipmentPrice={setEquipmentPrice}
              setInstallments={setInstallments}
              setAnnualInterest={setAnnualInterest}
              calculatedStep2={calculatedStep2}
              setCalculatedStep2={setCalculatedStep2}
              isStep2Valid={isStep2Valid}
              monthlySavings={monthlySavings}
              monthlyInstallment={monthlyInstallment}
              difference={difference}
              savingsGreaterThanInstallment={savingsGreaterThanInstallment}
              discountPercent={discountPercent}
              resetStep2={resetStep2}
              goBackToStep1={() => setStep(1)}
            />
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
