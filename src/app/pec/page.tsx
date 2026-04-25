import { Footer } from '../components/layout/footer';
import CarouselPec from '../components/carouselPec/carouselPec';
import logo from '@/images/logo.png';
import FloatingButtons from '../components/floatingButtons/floatingButtons';

export default function PecPage() {
  return (
    <>
      <main>
        <CarouselPec />
        <FloatingButtons showEmail />
      </main>
      <Footer logoSrc={logo} />
    </>
  );
}
