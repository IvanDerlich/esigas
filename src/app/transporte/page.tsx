import { FooterTransporte } from '../components/layout/footerTransporte';
import NavBarTransporte from '../components/header/navBarTransporte';
import HeroTransporte from '../components/heroTransporte/heroTransporte';
import { Benefits } from '../components/benefits/benefits';
import { Numbers } from '../components/numbers/numbers';

export default function Page() {
  return (
    <>
      <NavBarTransporte />
      <HeroTransporte />
      <Benefits />
      <Numbers />
      <FooterTransporte />
    </>
  );
}
