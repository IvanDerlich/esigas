export interface Advantage {
  title: string;
  description: string;
}

const years = new Date().getFullYear() - 1989;

export const advantages: Advantage[] = [
  {
    title: `${years} años de trayectoria`,
    description: `Hace ${years} años nos dedicamos a convertir, reparar, habilitar, abastecer y desarrollar vehículos a GNC, siendo una de las empresas con más trayectoria en el rubro a nivel nacional.`,
  },
  {
    title: 'Especialistas en GNC',
    description:
      'Nos dedicamos pura y exclusivamente al GNC, tanto en nuestros talleres, PECS, estaciones de servicio y transporte ecológico',
  },
  {
    title: 'Confiabilidad y Seguridad',
    description:
      'Más de 100.000 vehículos convertidos avalan nuestros equipos, certificados y homologados bajo estrictas normas internacionales.',
  },
  {
    title: 'Servicio y Postventa',
    description:
      'Brindamos un servicio de calidad y personalizado a cada cliente, el postventa es fundamental para la tranquilidad de nuestros clientes, siempre que lo necesiten se pueden acercar al taller que deseen para resolver cualquier inconveniente.',
  },
];
