import { FooterTransporte } from '../components/layout/footerTransporte';
import NavBarTransporte from '../components/header/navBarTransporte';
import { Benefits } from '../components/benefits/benefits';
import { Numbers } from '../components/numbers/numbers';
import { Arguments } from '../components/arguments/arguments';

export default function Page() {
  return (
    <>
      <NavBarTransporte />
      <Benefits />
      <Arguments />
      <Numbers />
      <FooterTransporte />
    </>
  );
}
