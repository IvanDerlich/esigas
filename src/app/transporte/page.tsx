import { FooterTransporte } from '../components/layout/footerTransporte';
import NavBarTransporte from '../components/header/navBarTransporte';
import { Benefits } from '../components/benefits/benefits';
import { Numbers } from '../components/numbers/numbers';

export default function Page() {
  return (
    <>
      <NavBarTransporte />
      <Benefits />
      <Numbers />
      <FooterTransporte />
    </>
  );
}
