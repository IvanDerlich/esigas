'use client';

import styles from './calculator.module.css';
import { Abyssinica_SIL } from 'next/font/google';
import { useState } from 'react';

const abyssinica = Abyssinica_SIL({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export default function Calculator() {
  const [step, setStep] = useState(1);

  const [vehicleConsumption, setVehicleConsumption] = useState('');
  const [naftaPrice, setNaftaPrice] = useState('');
  const [gncPrice, setGncPrice] = useState('');
  const [showSavings, setShowSavings] = useState(false);

  const [monthlyKm, setMonthlyKm] = useState('');
  const [equipmentCost, setEquipmentCost] = useState('');
  const [showRecovery, setShowRecovery] = useState(false);

  const ahorro =
    (parseFloat(vehicleConsumption) || 0) *
    ((parseFloat(naftaPrice) || 0) - (parseFloat(gncPrice) || 0));

  const monthlySavings = (ahorro * (parseFloat(monthlyKm) || 0)) / 100;
  const recoveryTime = (parseFloat(equipmentCost) || 0) / (monthlySavings || 1);
  const years = Math.floor(recoveryTime / 12);
  const months = Math.round(recoveryTime % 12);

  const resetStep1 = () => {
    setVehicleConsumption('');
    setNaftaPrice('');
    setGncPrice('');
    setShowSavings(false);
  };

  const resetStep2 = () => {
    setMonthlyKm('');
    setEquipmentCost('');
    setShowRecovery(false);
  };

  return (
    <div className={`${abyssinica.className} ${styles.wrapper}`}>
      <div className={styles.containerTitle}>
        <h1 className={styles.title}>Calculadora De Ahorro</h1>
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
              <span>Recuperación De Equipo</span>
            </div>

            <div className={styles.inputGroup}>
              <p>Consumo Del Vehículo Cada 100 Km:</p>
              <div className={styles.inputUnit}>
                <input
                  type="number"
                  value={vehicleConsumption}
                  onChange={e => setVehicleConsumption(e.target.value)}
                />
                <span>Litros</span>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <p>Precio De Nafta Super:</p>
              <div className={styles.inputUnit}>
                <input
                  type="number"
                  value={naftaPrice}
                  onChange={e => setNaftaPrice(e.target.value)}
                />
                <span>$ / Litros</span>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <p>Precio Del GNC:</p>
              <div className={styles.inputUnit}>
                <input
                  type="number"
                  value={gncPrice}
                  onChange={e => setGncPrice(e.target.value)}
                />
                <span>$ / M³</span>
              </div>
            </div>

            {showSavings && (
              <div className={styles.output}>
                Ahorrás{' '}
                <span className={styles.green}>${ahorro.toFixed(0)}</span> Cada
                100 Km
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
                    ‹ Volver A Calcular
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
                    if (vehicleConsumption && naftaPrice && gncPrice) {
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
                <span>Ahorro Cada 100 Km</span>
                <span className={styles.green}>Recuperación De Equipo</span>
              </div>

              <div className={styles.inputGroup}>
                <p>Kilómetros Recorridos Por Mes:</p>
                <div className={styles.inputUnit}>
                  <input
                    type="number"
                    value={monthlyKm}
                    onChange={e => setMonthlyKm(e.target.value)}
                  />
                  <span>Km</span>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <p>Precio Del Equipo:</p>
                <div className={styles.inputUnit}>
                  <input
                    type="number"
                    value={equipmentCost}
                    onChange={e => setEquipmentCost(e.target.value)}
                  />
                  <span>$</span>
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
