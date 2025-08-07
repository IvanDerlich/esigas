'use client';
import { Abyssinica_SIL } from 'next/font/google';

import styles from './calculator.module.css';
import { useState } from 'react';

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

// This is the relative efficiency coefficient of the liter of nafta with respect to the m3 of gnc
const RELATIVE_EFFICIENCY = 1.3;

export default function Calculator() {
  const [vehicleConsumptionPer100km, setVehicleConsumption] =
    useState<number>(0);
  const [step, setStep] = useState(1);

  const [naftaPrice, setNaftaPrice] = useState<number>(0);
  const [gncPrice, setGncPrice] = useState<number>(0);
  const [showSavings, setShowSavings] = useState(false);

  const [monthlyKm, setMonthlyKm] = useState<number>(0);
  const [equipmentCost, setEquipmentCost] = useState<number>(0);

  const savingsPer100Km =
    vehicleConsumptionPer100km * (naftaPrice - gncPrice / RELATIVE_EFFICIENCY);
  const [showRecovery, setShowRecovery] = useState(false);

  const monthlySavings = (savingsPer100Km * monthlyKm) / 100;
  const recoveryTime = equipmentCost / monthlySavings;
  const years = Math.floor(recoveryTime / 12);
  const months = Math.round(recoveryTime % 12);

  const resetStep1 = () => {
    setVehicleConsumption(0);
    setNaftaPrice(0);
    setGncPrice(0);
    setShowSavings(false);
  };

  const resetStep2 = () => {
    setMonthlyKm(0);
    setEquipmentCost(0);
    setShowRecovery(false);
  };

  return (
    <div className={`${abyssinica.className} ${styles.wrapper}`}>
      <div className={styles.containerTitle}>
        <h1 className={styles.title}>Calculadora de Ahorro</h1>
      </div>

      <div className={styles.container}>
        <div className={styles.containerText}>
          <p>
            ¿Tenes un vehículo a nafta y queres ver cuanto te ahorras con GNC?
          </p>
        </div>

        <div className={styles.calcWrapper}>
          {/* Card 1 */}
          <div className={styles.card}>
            <div className={styles.tabs}>
              <span className={styles.green}>Ahorro Cada 100 Km</span>
              <span className={styles.gray}>Recuperación del Equipo</span>
            </div>

            <div className={styles.inputGroup}>
              <p>Consumo de nafta Cada 100 Km:</p>
              <div className={styles.inputUnit}>
                <input
                  type="number"
                  value={vehicleConsumptionPer100km}
                  onChange={e => setVehicleConsumption(Number(e.target.value))}
                />
                <span className={styles.espacio}>Litros</span>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <p>Precio de la Nafta:</p>
              <div className={styles.inputUnit}>
                <input
                  type="number"
                  value={naftaPrice}
                  onChange={e => setNaftaPrice(Number(e.target.value))}
                />
                <span className={styles.espacio}>$ / L </span>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <p>Precio del GNC:</p>
              <div className={styles.inputUnit}>
                <input
                  type="number"
                  value={gncPrice}
                  onChange={e => setGncPrice(Number(e.target.value))}
                />
                <span>$ / M³</span>
              </div>
            </div>

            {showSavings && (
              <div className={styles.output}>
                Ahorrás{' '}
                <span className={styles.green}>
                  ${savingsPer100Km.toFixed()}
                </span>{' '}
                Cada 100 Km
              </div>
            )}

            <div
              className={`${styles.buttonGroup} ${showSavings ? styles.alignBetween : styles.alignEnd}`}
            >
              {showSavings ? (
                <>
                  <button
                    className={styles.link}
                    onClick={() => {
                      resetStep1();
                    }}
                  >
                    ‹ Volver a Calcular
                  </button>
                  <button
                    className={`${abyssinica.className} ${styles.btn}`}
                    onClick={() => {
                      setStep(2);
                      setShowRecovery(false);
                    }}
                  >
                    Siguiente
                  </button>
                </>
              ) : (
                <button
                  className={`${abyssinica.className} ${styles.btn}`}
                  onClick={() => {
                    if (vehicleConsumptionPer100km && naftaPrice && gncPrice) {
                      setShowSavings(true);
                    }
                  }}
                >
                  Calcular
                </button>
              )}
            </div>
          </div>

          {/* Card 2 */}
          {step === 2 && (
            <div className={styles.card}>
              <div className={styles.tabs}>
                <span className={styles.gray}>Ahorro cada 100 Km</span>
                <span className={styles.green}>Recuperación del Equipo</span>
              </div>

              <div className={styles.inputGroup}>
                <p>Kilómetros Recorridos por Mes:</p>
                <div className={styles.inputUnit}>
                  <input
                    type="number"
                    value={monthlyKm}
                    onChange={e => setMonthlyKm(Number(e.target.value))}
                  />
                  <span>Km</span>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <p>Precio del Equipo:</p>
                <div className={styles.inputUnit}>
                  <input
                    type="number"
                    value={equipmentCost}
                    onChange={e => setEquipmentCost(Number(e.target.value))}
                  />
                  <span className={styles.espacio}>$</span>
                </div>
              </div>

              {showRecovery && (
                <div className={styles.output}>
                  Recuperás lo invertido en{' '}
                  <span className={styles.green}>
                    {recoveryTime < 1
                      ? 'Menos de 1 Mes'
                      : `${years > 0 ? `${years} Año${years > 1 ? 's' : ''} ` : ''}${months} Meses`}
                  </span>
                </div>
              )}

              <div
                className={`${styles.buttonGroup} ${showSavings ? styles.alignBetween : styles.alignEnd}`}
              >
                <button
                  className={styles.link}
                  onClick={() => {
                    setStep(1);
                    resetStep2();
                  }}
                >
                  ‹ Anterior
                </button>
                <button
                  className={styles.btn}
                  onClick={() => {
                    if (monthlyKm && equipmentCost) {
                      setShowRecovery(true);
                    }
                  }}
                >
                  Calcular
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
