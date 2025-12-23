import { Footer } from '../components/layout/footer';
import CarouselPec from '../components/carouselPec/carouselPec';
import logo from '@/images/logo.png';

export default function PecPage() {
  return (
    <>
      <main>
        <CarouselPec />
      </main>
      <Footer logoSrc={logo} />
    </>
  );
}
